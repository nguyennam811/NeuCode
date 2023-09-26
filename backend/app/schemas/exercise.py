from pydantic import BaseModel, NonNegativeFloat
from typing import Optional
from ..models import Difficulty
from .user import ShowUser
import datetime

class Exercise(BaseModel):
    id: str
    user_id: str
    title: str
    difficulty: Difficulty
    exercise_type: Optional[str]
    points: Optional[NonNegativeFloat]
    instructions: Optional[str]

class ShowExercise(Exercise):
    user: Optional[ShowUser]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True