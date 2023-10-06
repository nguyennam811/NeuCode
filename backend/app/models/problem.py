from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel
class Difficulty(enum.Enum):
    EASY = "Dễ"
    MEDIUM = "Trung bình"
    DIFFICULT = "Khó"
    def to_json(self):
        return self.value
class Problem(Base, TimeModel):
    __tablename__ = 'problems'

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = Column(String, nullable=False)
    difficulty = Column(Enum(Difficulty), default=Difficulty.EASY)
    problem_type = Column(String, nullable=False)
    points = Column(Float, nullable=False, default=0)
    instructions = Column(Text, nullable=True)

    user = relationship("User", back_populates="problems")
    submissions = relationship("Submission", back_populates="problems")
    tests = relationship("Test", back_populates="problems")
