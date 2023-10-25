from pydantic import BaseModel, NonNegativeFloat
from typing import Optional
import datetime

class Submission(BaseModel):
    user_id: str
    problem_id: str
    language: str
    code: Optional[str]
    assignment_id: Optional[str]

class ShowSubmission(Submission):
    # user: Optional[ShowUser]
    id: str
    status: Optional[str]
    score: Optional[NonNegativeFloat]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True