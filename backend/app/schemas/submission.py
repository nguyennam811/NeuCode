from pydantic import BaseModel, NonNegativeFloat
from typing import Optional
import datetime

class Submission(BaseModel):
    user_id: str
    exercise_id: str
    language: str
    status: Optional[str]
    score: Optional[NonNegativeFloat]
    code: Optional[str]

class ShowSubmission(Submission):
    # user: Optional[ShowUser]
    id: str
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True