from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
import datetime

class Test(BaseModel):
    problem_id: str
    input: str
    output: str
class ShowTest(Test):
    # problems: Optional[ShowProblem]
    id: str
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True


class Test_Result(BaseModel):
    submission_id: str
    test_id: str
    output: str
    time: Optional[NonNegativeFloat]
    memory: Optional[NonNegativeFloat]
    status_data: str

class ShowTestResult(Test_Result):
    tests: Optional[ShowTest]
    id: str
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True