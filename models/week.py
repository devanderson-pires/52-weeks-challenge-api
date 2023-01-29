from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.dialects.mysql import DATE, DECIMAL
from sqlalchemy.orm import relationship

from database import Base


class Week(Base):
    __tablename__ = "weeks"
    id = Column(Integer, autoincrement=True, primary_key=True)
    date = Column(DATE, nullable=False)
    week = Column(Integer, nullable=False)
    deposit = Column(DECIMAL, nullable=False)
    balance = Column(DECIMAL, nullable=False)
    done = Column(Boolean, default=False, nullable=False)
    goal_id = Column(Integer, ForeignKey("goals.id"))
    goal = relationship("Goal", back_populates="weeks", lazy="joined")
