from fastapi import APIRouter
from . import user, authentication, problem, submission, test, test_result, execute_code_test, course, course_student, assignment,admin

root_router = APIRouter()

@root_router.get('/info/', include_in_schema=False)
def root():
    return {'message': 'Ok'}


root_router.include_router(authentication.router, prefix='', tags=["Authn"])
root_router.include_router(problem.router, prefix='/api/problems', tags=["Problems"])
root_router.include_router(submission.router, prefix='/api/submissions', tags=["Submissions"])
root_router.include_router(user.router, prefix='/api/users', tags=["Users"])
root_router.include_router(test.router, prefix='/api/test', tags=["Tests"])
root_router.include_router(test_result.router, prefix='/api/test_result', tags=["Test Result"])
root_router.include_router(execute_code_test.router, prefix='', tags=["Execute"])
root_router.include_router(course.router, prefix='/api/course', tags=["Courses"])
root_router.include_router(course_student.router, prefix='/api/course_student', tags=["CourseStudent"])
root_router.include_router(assignment.router, prefix='/api/assignment', tags=["Assignments"])
root_router.include_router(admin.router, prefix='/api/admin', tags=["Admin"])
