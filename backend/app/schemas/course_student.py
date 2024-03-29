from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
from .user import ShowUser
import datetime

class CourseStudent(BaseModel):
    course_id: str
    student_ids: str

class CourseInfo(BaseModel):
    teacher_id: str
    course_name: str
    course_time: str
    course_description: Optional[str]
    user: Optional[ShowUser]
    class Config():
        orm_mode = True

class ShowCourseStudent(BaseModel):
    id: str
    course_id: str
    student_id: str
    user: Optional[ShowUser]
    courses: Optional[CourseInfo]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseCourseStudent(BaseModel):
    total: int
    data: List[ShowCourseStudent]
    class Config:
        orm_mode = True
