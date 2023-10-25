from .user import User, Role
from .submission import Submission
from .problem import Problem, Difficulty
from .test import Test, Test_Result
from .course import Course
from .course_student import CourseStudent
from .assignment import Assignment
# group_id = Column(GUID, ForeignKey('groups.id', ondelete='CASCADE'), nullable=False)
