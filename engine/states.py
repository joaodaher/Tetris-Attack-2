
def block_is_floating(block):
    return block.is_floating


def block_is_combo(block):
    return bool(block.combos)


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
        return next_state(**self.kwargs)


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
    def __init__(self, name, condition, duration=1.0):
        self.name = name
        self.condition = condition
        self.duration = duration

    def __iter__(self):
        if self.duration > 0:
            return self
        else:
            return self.condition.evaluate()

    def __next__(self):
        self.duration -= 1.0
        if self.duration == 0.0:
            return self.condition.evaluate()
        else:
            return self

    def __str__(self):
        return self.name


class ExitState(StopIteration):
    def __init__(self, name, duration=0.0):
        self.name = name
        self.duration = duration

    def __iter__(self):
        return self

    def __next__(self, speed=1.0):
        self.duration -= speed
        if self.duration == 0.0:
            raise self
        else:
            return self

    def __str__(self):
        return self.name


class Stable(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "STABLE"
        condition = IsFloatingCondition(block)
        super().__init__(name, condition, duration)


class Falling(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "FALLING"
        condition = IsFloatingCondition(block)
        super().__init__(name, condition, duration)


class Swapping(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "SWAPPING"
        condition = IsFloatingCondition(block)
        super().__init__(name, condition, duration)


class Standing(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "STANDING"
        condition = IsPressingCondition(block)
        super().__init__(name, condition, duration)


class Unpressed(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "UNPRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class MorePressed(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "MOREPRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class Pressed(BinaryState):
    def __init__(self, block, duration=1.0):
        name = "PRESSED"
        condition = IsComboCondition(block)
        super().__init__(name, condition, duration)


class Explode(ExitState):
    def __init__(self, duration=1.0):
        name = "EXPLODE"
        super().__init__(name, duration)


class Endboard(ExitState):
    def __init__(self, duration=1.0):
        name = "ENDBOARD"
        super().__init__(name, duration)


class StateMachine:
    def __init__(self, entry_state, block):
        self.state = entry_state
        self.block = block

    def __iter__(self):
        return self

    def __next__(self):
        self.state = self.state.next()
        return self
