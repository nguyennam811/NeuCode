from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
import datetime
from ..models import Difficulty
from .user import ShowUser
from .course import CourseInfo

class Submission(BaseModel):
    submiter_id: str
    problem_id: str
    language: str
    code: Optional[str]
    assignment_id: Optional[str]

class SubmissionResult(BaseModel):
    id: str
    submission_id: str
    output: str
    time: Optional[NonNegativeFloat]
    memory: Optional[NonNegativeFloat]
    status_data: str
    created: datetime.datetime
    class Config():
        orm_mode = True

class ProblemSubmit(BaseModel):
    id: str
    user_id: str
    title: str
    difficulty: Difficulty
    problem_type: Optional[str]
    description: Optional[str]
    max_memory_limit: Optional[NonNegativeFloat]
    max_execution_time: Optional[NonNegativeFloat]
    class Config():
        orm_mode = True

class CourseAssignment(BaseModel):
    id: str
    courses: Optional[CourseInfo]
    class Config():
        orm_mode = True

class ShowSubmission(Submission):
    # user: Optional[ShowUser]
    id: str
    status: Optional[str]
    score: Optional[NonNegativeFloat]
    submiter: Optional[ShowUser]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    problems: Optional[ProblemSubmit]
    tests_result: List[SubmissionResult]
    assignment: Optional[CourseAssignment]
    class Config():
        orm_mode = True

class ResponseSubmission(BaseModel):
    total: int
    data: List[ShowSubmission]
    class Config:
        orm_mode = True