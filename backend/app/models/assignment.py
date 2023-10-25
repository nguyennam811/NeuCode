from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel

class Assignment(Base, TimeModel):
    __tablename__ = 'assignments'

    # id = Column(String, primary_key=True, index=True)
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    problem_id = Column(String, ForeignKey('problems.id', ondelete='CASCADE'), nullable=False)
    course_id = Column(String, ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)

    deadline = Column(DateTime(timezone=True), nullable=True)
    isPublic = Column(Boolean, nullable=False, default=False)

    problems = relationship("Problem", back_populates="assignment")
    courses = relationship("Course", back_populates="assignment")
    submissions = relationship("Submission", back_populates="assignment")


