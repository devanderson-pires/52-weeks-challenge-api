from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.mysql import DATE, DECIMAL
from sqlalchemy.orm import relationship

from database import Base


class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, nullable=False)
    goal = Column(DECIMAL, nullable=False)
    start = Column(DECIMAL, nullable=False)
    weeks_remaining = Column(Integer, nullable=False)
    reached = Column(DECIMAL, nullable=False)
    starts_at = Column(DATE, nullable=False)
    ends_at = Column(DATE, nullable=False)
    weeks = relationship(
        "Week", back_populates="goal", cascade="all, delete-orphan", lazy="joined"
    )
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="goals", lazy="joined")
