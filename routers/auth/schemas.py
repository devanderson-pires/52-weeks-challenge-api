from pydantic import BaseModel

# from typing import Optional


class User(BaseModel):
    name: str
    email: str

    class Config:
        orm_mode = True


class StoreUser(User):
    password: str
