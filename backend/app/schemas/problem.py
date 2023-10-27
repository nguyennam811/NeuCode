from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
from ..models import Difficulty
from .user import ShowUser
from .test import ShowTest
import datetime

class Problem(BaseModel):
    id: str
    user_id: str
    title: str
    difficulty: Difficulty
    problem_type: Optional[str]
    # points: Optional[NonNegativeFloat]
    description: Optional[str]
    max_memory_limit: Optional[NonNegativeFloat]
    max_execution_time: Optional[NonNegativeFloat]

class ProblemAssignment(Problem):
    deadline: Optional[datetime.datetime]  # Sử dụng kiểu dữ liệu datetime từ thư viện Python
    isPublic: Optional[bool]

class ShowProblem(Problem):
    user: Optional[ShowUser]
    tests: List[ShowTest]
    instructions: Optional[str]
    points: Optional[NonNegativeFloat]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseProblem(BaseModel):
    total: int
    data: List[ShowProblem]
    class Config:
        orm_mode = True