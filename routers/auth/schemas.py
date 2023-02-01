from typing import Optional

from pydantic import BaseModel, EmailStr


class User(BaseModel):
    id: Optional[int]
    name: str
    email: EmailStr

    class Config:
        orm_mode = True


class CreateUser(User):
    password: str
