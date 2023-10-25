from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel

class CourseStudent(Base, TimeModel):
    __tablename__ = 'course_student'

    # id = Column(String, primary_key=True, index=True, nullable=False)
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_id = Column(String, ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)

    user = relationship("User", back_populates="student_course")
    courses = relationship("Course", back_populates="student_course")


