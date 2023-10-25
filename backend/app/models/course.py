from ..database import Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import TimeModel
import uuid

class Course(Base, TimeModel):
    __tablename__ = 'courses'

    # id = Column(String, primary_key=True, index=True, nullable=False)
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    teacher_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_name = Column(String, nullable=False)
    course_description = Column(String, nullable=True)
    course_time = Column(String, nullable=False)

    user = relationship("User", back_populates="courses")
    student_course = relationship("CourseStudent", back_populates="courses")
    assignment = relationship("Assignment", back_populates="courses")

