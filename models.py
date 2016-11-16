# coding: utf-8
from datetime import datetime

import mongoengine as me


def marvel_generator(badass=True, amount=1):
    from sprintero import generator, constants
    from sprintero.names_collection.picker import CollectionPicker

    collection = CollectionPicker(constants.NamesCollectionsE.MARVEL).read_collection()
    generator = generator.NameGenerator(collection=collection, badass=badass)
    if amount == 1:
        return generator.choose_name()
    else:
        return [generator.choose_name() for _ in range(0, amount)]


me.connect('tetris')


class User(me.Document):
    email = me.EmailField(primary_key=True, required=True)
    password = me.StringField(required=True)
    nickname = me.StringField(required=True)

    created_at = me.DateTimeField(default=datetime.now)
    last_login = me.DateTimeField(null=True)

    # flask auth fields
    is_authenticated = me.BooleanField(default=False)
    is_active = me.BooleanField(default=True)
    is_anonymous = me.BooleanField(default=False)

    @classmethod
    def create(cls, email, password, nickname=None):
        user = cls.objects(email=email)
        if not user:
            if not nickname:
                nickname = marvel_generator()
            user = User(email=email, password=password, nickname=nickname)
            user.save()
        return user

    @classmethod
    def login(cls, email, password):
        try:
            user = cls.objects.get(email=email, password=password)
            user.last_login = datetime.now()
            user.is_authenticated = True
            user.save()
            return user
        except User.DoesNotExist:
            return None

    def get_id(self):
        return self.email
