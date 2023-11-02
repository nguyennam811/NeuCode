from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
from .user import ShowUser
from .course import ShowCourse
import datetime

class CourseStudent(BaseModel):
    course_id: str
    student_ids: str

class ShowCourseStudent(BaseModel):
    id: str
    course_id: str
    student_id: str
    user: Optional[ShowUser]
    courses: Optional[ShowCourse]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseCourseStudent(BaseModel):
    total: int
    data: List[ShowCourseStudent]
    class Config:
        orm_mode = True
