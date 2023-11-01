from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
from .problem import ShowProblem
from .course import ShowCourse
import datetime

class Assignment(BaseModel):
    problem_id: str
    course_id: str
    deadline: Optional[datetime.datetime]
    is_public: bool

class ShowAssignment(Assignment):
    id: str
    problems: Optional[ShowProblem]
    courses: Optional[ShowCourse]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseAssignments(BaseModel):
    total: int
    data: List[ShowAssignment]
    class Config:
        orm_mode = True