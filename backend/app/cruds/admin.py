from sqlalchemy.orm import Session
from . import problem, submission, course, user
def fetch_data_for_dashboard(
        db: Session,
):
    problems = problem.get_all_problems_admin(db=db)
    submissions = submission.get_all_submissions_admin(db=db)
    courses = course.get_all_courses_admin(db=db)
    student = user.get_all_users_admin(db=db, role='student')
    teacher = user.get_all_users_admin(db=db, role='teacher')
    return {
        'total_problem': len(problems),
        'total_submission': len(submissions),
        'total_courses': len(courses),
        'total_student': len(student),
        'total_teacher': len(teacher),
    }