from datetime import date
from typing import Optional

from pydantic import BaseModel


class Goal(BaseModel):
    id: Optional[int]
    name: str
    goal: float
    start: float
    weeks_remaining: int
    reached: float
    starts_at: date
    ends_at: date
    user_id: Optional[int]

    class Config:
        orm_mode = True


class CreateGoal(BaseModel):
    name: str
    start: float
    starts_at: date


class EditGoal(BaseModel):
    name: str
