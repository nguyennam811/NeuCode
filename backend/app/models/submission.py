from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel
class Submission(Base, TimeModel):
    __tablename__ = 'submission'

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    problem_id = Column(String, ForeignKey('problems.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    language = Column(String, nullable=False, default='C++')
    code = Column(Text, nullable=False)
    score = Column(Float, nullable=True)
    status = Column(String, nullable=True)

    user = relationship("User", back_populates="submissions")
    problems = relationship("Problem", back_populates="submissions")

