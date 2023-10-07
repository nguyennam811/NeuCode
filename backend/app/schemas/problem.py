from pydantic import BaseModel, NonNegativeFloat
from typing import Optional
from ..models import Difficulty
from .user import ShowUser
import datetime

class Problem(BaseModel):
    id: str
    user_id: str
    title: str
    difficulty: Difficulty
    problem_type: Optional[str]
    points: Optional[NonNegativeFloat]
    instructions: Optional[str]
    max_memory_limit: Optional[NonNegativeFloat]
    max_execution_time: Optional[NonNegativeFloat]


class ShowProblem(Problem):
    user: Optional[ShowUser]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True