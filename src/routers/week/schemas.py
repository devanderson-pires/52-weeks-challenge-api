from datetime import date
from typing import Optional

from pydantic import BaseModel


class Week(BaseModel):
    id: Optional[int]
    date: date
    week: int
    deposit: float
    balance: float
    done: bool
    goal_id: Optional[int]

    class Config:
        orm_mode = True


class EditWeek(BaseModel):
    done: bool
