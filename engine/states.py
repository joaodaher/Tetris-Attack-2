
def block_is_floating(block):
    return block.is_floating


def block_is_combo(block):
    return block.is_combo


def block_is_pressing(block):
    return not block.has_up


def block_is_crushed(block):
    return block.is_crushed


class Condition:
    def __init__(self, method, positive, negative, **kwargs):
        self.kwargs = kwargs
        self.method = method
        self.positive = positive
        self.negative = negative

    def evaluate(self):
        next_state = self.positive if self.method(**self.kwargs) else self.negative
        return next(next_state(**self.kwargs))


class IsFloatingCondition(Condition):
    def __init__(self, block):
        method = block_is_floating
        positive = Falling
        negative = Standing
        super().__init__(method, positive, negative, **{'block': block})


class IsPressingCondition(Condition):
    def __init__(self, block):
        method = block_is_pressing
        positive = MorePressed
        negative = Unpressed
        super().__init__(method, positive, negative, **{'block': block})


class IsCrushedCondition(Condition):
    def __init__(self, block):
        method = block_is_crushed
        positive = Endboard
        negative = Pressed
        super().__init__(method, positive, negative, **{'block': block})


class IsComboCondition(Condition):
    def __init__(self, block):
        method = block_is_combo
        positive = Explode
        negative = Stable
        super().__init__(method, positive, negative, **{'block': block})


class AnyStoneCondition(Condition):
    def __init__(self, block_a, block_b):
        method = block_is_combo
        positive = Explode
        negative = Stable
        super().__init__(method, positive, negative, **{'left': block_a, 'right': block_b})


class BinaryState:
    def __init__(self, name, condition, duration=1.0, detours=None):
        self.name = name
        self.condition = condition
        self.duration = duration
        self.detours = detours if detours else []

    def detour(self, state):
        if state in self.detours:
            return next(state(**self.condition.kwargs))
        return self

    def __next__(self):
        if self.duration > 0.0:
            self.duration -= 1.0
            return self
        else:
            return self.condition.evaluate()

    @property
    def ready(self):
        return self.duration == 1.0 or self.duration == 0.0

    def __str__(self):
        return self.name


class ExitState(StopIteration):
    def __init__(self, name, duration=0.0):
        self.name = name
        self.duration = duration

    def __next__(self, speed=1.0):
        if self.duration > 0.0:
            self.duration -= 1.0
            return self
        else:
            raise self

    def detour(self, state):
        return self

    @property
    def ready(self):
        return False  # when ready, it raises

    def __str__(self):
        return self.name


class Stable(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "STABLE"
        condition = IsFloatingCondition(block)
        detours = [SwappingLeft, SwappingRight]
        super().__init__(name, condition, duration, detours)


class Falling(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "FALLING"
        condition = IsFloatingCondition(block)
        super().__init__(name, condition, duration)


class Swapping(BinaryState):
    def __init__(self, name, block, duration=1.0):
        condition = IsFloatingCondition(block)
        super().__init__(name, condition, duration)


class SwappingLeft(Swapping):
    def __init__(self, block, duration=1.0):
        name = "LSWAPPING"
        super().__init__(name, block, duration)


class SwappingRight(Swapping):
    def __init__(self, block, duration=1.0):
        name = "RSWAPPING"
        super().__init__(name, block, duration)


class Standing(BinaryState):
    def __init__(self, block, duration=0.0):
        name = "STANDING"
        condition = IsPressingCondition(block)
        super().__init__(name, condition, duration)


class Unpressed(BinaryState):
    def __init__(self, block, duration=0.0):
        name = "UNPRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class MorePressed(BinaryState):
    def __init__(self, block, duration=0.0):
        name = "MOREPRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class Pressed(BinaryState):
    def __init__(self, block, duration=0.0):
        name = "PRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class Explode(ExitState):
    def __init__(self, block, duration=1.0):
        name = "EXPLODE"
        super().__init__(name, duration)


class Endboard(ExitState):
    def __init__(self, block, duration=1.0):
        name = "ENDBOARD"
        super().__init__(name, duration)
