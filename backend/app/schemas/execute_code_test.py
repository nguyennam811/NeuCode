from pydantic import BaseModel, NonNegativeFloat
from typing import Optional

class TestCase(BaseModel):
    problem_id: str
    language: str
    code: Optional[str]
class ShowTestCase_Result(BaseModel):
    test_id: str
    output: str
    time: Optional[NonNegativeFloat]
    memory: Optional[NonNegativeFloat]
    status_data: str
    class Config():
        orm_mode = True
