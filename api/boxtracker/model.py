from enum import IntFlag
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class BoxObjectFields(IntFlag):
    NAME = 1
    DESC = 2
    LOCATION = 4
    CONTENTS = 8


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')


class Box(BaseModel):
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    desc: str
    location: str
    contents: list[str]

    @staticmethod
    def from_dict(dict_: dict) -> 'Box':
        return Box(**dict_)

    def _fields(self) -> dict[BoxObjectFields, str]:
        return {
            BoxObjectFields.NAME: self.name,
            BoxObjectFields.DESC: self.desc,
            BoxObjectFields.LOCATION: self.location,
        }

    @staticmethod
    def _matches_field(field, exact, query) -> bool:
        if exact:
            return query == field
        return query in field

    def matches_string(self, string: str, fields: BoxObjectFields, exact: bool) -> bool:
        for field, value in self._fields().items():
            if field & fields and Box._matches_field(value, exact, string):
                return True
        if fields & BoxObjectFields.CONTENTS:
            for object in self.contents:
                if Box._matches_field(object, exact, string):
                    return True
        return False


class UpdateBox(BaseModel):
    name: Optional[str]
    desc: Optional[str]
    location: Optional[str]
    contents: Optional[list[str]]

    def update_with(self, other: Box):
        if self.name is None:
            self.name = other.name
        if self.desc is None:
            self.desc = other.desc
        if self.location is None:
            self.location = other.location
        if self.contents is None:
            self.contents = other.contents
