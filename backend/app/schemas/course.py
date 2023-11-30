from pydantic import BaseModel, NonNegativeFloat
from typing import Optional, List
from .user import ShowUser
from .course_student import ShowCourseStudent
import datetime

class Course(BaseModel):
    teacher_id: str
    course_name: str
    course_time: str
    course_description: Optional[str]

class CourseInfo(BaseModel):
    teacher_id: str
    course_name: str
    course_time: str
    course_description: Optional[str]
    class Config():
        orm_mode = True

class ShowCourse(Course):
    id: str
    user: Optional[ShowUser]
    student_course: List[ShowCourseStudent]
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseCourses(BaseModel):
    total: int
    data: List[ShowCourse]
    class Config:
        orm_mode = True