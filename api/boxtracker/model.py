from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


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

    def matches_string(self, string: str) -> bool:
        for field in {self.name, self.desc, self.location}:
            if field is not None and string in field:
                return True
        for item in self.contents:
            if string in item:
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
