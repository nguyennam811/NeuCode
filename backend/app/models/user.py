from ..database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
import enum
from .base import TimeModel
class Role(enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"
    def to_json(self):
        return self.value


class User(Base, TimeModel):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, index=True)
    fullname = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False, unique=True)
    role = Column(Enum(Role), default=Role.STUDENT)

    problems = relationship("Problem", back_populates="user")
    submissions = relationship("Submission", back_populates="user")
    courses = relationship("Course", back_populates="user")
    student_course = relationship("CourseStudent", back_populates="user")