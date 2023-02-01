from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(255), index=True, nullable=False, unique=True)
    password = Column(String(50), nullable=False)
    goals = relationship(
        "Goal", back_populates="user", cascade="all, delete-orphan", lazy="joined"
    )
