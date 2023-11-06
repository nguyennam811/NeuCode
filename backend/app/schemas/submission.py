from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
import datetime

class Submission(BaseModel):
    user_id: str
    problem_id: str
    language: str
    code: Optional[str]
    assignment_id: Optional[str]

class SubmissionResult(BaseModel):
    submission_id: str
    output: str
    time: Optional[NonNegativeFloat]
    memory: Optional[NonNegativeFloat]
    status_data: str
    class Config():
        orm_mode = True

class ShowSubmission(Submission):
    # user: Optional[ShowUser]
    id: str
    status: Optional[str]
    score: Optional[NonNegativeFloat]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    tests_result: List[SubmissionResult]
    class Config():
        orm_mode = True