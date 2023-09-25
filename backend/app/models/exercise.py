from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel
class Difficulty(enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    DIFFICULT = "difficult"
class Exercise(Base, TimeModel):
    __tablename__ = 'exercises'

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = Column(String, nullable=False)
    difficulty = Column(Enum(Difficulty), default=Difficulty.EASY)
    exercise_type = Column(String, nullable=False)
    points = Column(Float, nullable=False)
    instructions = Column(Text, nullable=True)
    user = relationship("User", back_populates="exercises")