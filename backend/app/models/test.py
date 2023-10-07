from app.database import Base
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.orm import relationship
import uuid
from .base import TimeModel

class Test(Base, TimeModel):
    __tablename__ = 'tests'

    # id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    id = Column(String, primary_key=True, index=True, nullable=False)
    problem_id = Column(String, ForeignKey('problems.id', ondelete='CASCADE'), nullable=False)

    input = Column(String, nullable=False)
    output = Column(String, nullable=False)

    problems = relationship("Problem", back_populates="tests")
    test_result = relationship("Test_Result", back_populates="tests")


class Test_Result(Base,TimeModel):
    __tablename__ = 'tests_result'

    # id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    id = Column(String, primary_key=True, index=True, nullable=False)
    submission_id = Column(String, ForeignKey('submission.id', ondelete='CASCADE'), nullable=True)
    test_id = Column(String, ForeignKey('tests.id', ondelete='CASCADE'), nullable=True)

    output = Column(String, nullable=True)
    time = Column(Float, nullable=True)
    memory = Column(Float, nullable=True)
    status_data = Column(String, nullable=True)

    submissions = relationship("Submission", back_populates="tests_result")
    tests = relationship("Test", back_populates="test_result")


#
# [
#   {
#     "problem_id": "sum",
#     "input": "5\n2",
#     "output": "3"
#   },
#   {
#     "problem_id": "sum",
#     "input": "240\n20",
#     "output": "220"
#   },
#   {
#     "problem_id": "sum",
#     "input": "10000010\n10",
#     "output": "10000000"
#   }
# ]
