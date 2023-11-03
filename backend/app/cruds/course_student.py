from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from ..models import Role
from sqlalchemy import select, text, func, delete
from typing import List


def get_course_student_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.CourseStudent).join(models.User, models.CourseStudent.student_id == models.User.id).where(text(' and '.join(conditions))).offset(
        offset).limit(limit).order_by(models.CourseStudent.created.desc())
    return db.execute(statement).scalars().all()

def count_course_student_with_conditions(db: Session, conditions):
    return db.query(func.count(models.CourseStudent.id)).join(models.User, models.CourseStudent.student_id == models.User.id).where(text(' and '.join(conditions))).scalar()
def get_course_student_all(
        db: Session,
        search_key: str,
        search_value: str,
        course_id: str,
        student_id: str,
        offset: int = 0,
        limit: int = 30,
):
    conditions = []
    if course_id:
        conditions.append(f"course_id = '{course_id}'")

    if student_id:
        conditions.append(f"student_id = '{student_id}'")

    if search_value != '':
        conditions.append(f"cast({search_key} as varchar) like('%{search_value}%')")
    print(conditions)

    return {
        'data': get_course_student_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_course_student_with_conditions(db=db, conditions=conditions)
    }

def create_course_student(request: schemas.CourseStudent, db: Session):
    course_id = request.course_id
    student_ids = request.student_ids

    if isinstance(student_ids, str):
        student_ids = student_ids.replace(" ", "")
        student_ids = student_ids.split(",")  # Chuyển chuỗi thành danh sách nếu nó là chuỗi

    added_students = []

    for student_id in student_ids:
        # student = db.query(models.User).filter(models.User.id == student_id, models.User.role == Role.STUDENT).first()
        #
        # if not student:
        #     raise HTTPException(status_code=404, detail=f"Student with ID {student_id} not found or is not a student")
        #
        # # Kiểm tra xem sinh viên đã tồn tại trong danh sách chưa
        # existing_student = db.query(models.CourseStudent).filter(
        #     models.CourseStudent.course_id == course_id,
        #     models.CourseStudent.student_id == student_id
        # ).first()
        #
        # if existing_student:
        #     raise HTTPException(status_code=400, detail=f"Student with ID {student_id} is already in the course")
        #
        # course_student = models.CourseStudent(course_id=course_id, student_id=student_id)
        # db.add(course_student)
        # added_students.append(course_student)
        # Kiểm tra xem sinh viên đã tồn tại trong danh sách chưa
        existing_student = db.query(models.CourseStudent).filter(
            models.CourseStudent.course_id == course_id,
            models.CourseStudent.student_id == student_id
        ).first()

        if existing_student:
            # Nếu sinh viên đã tồn tại, bỏ qua và lọc tiếp đến đứa tiếp theo
            continue

        student = db.query(models.User).filter(models.User.id == student_id, models.User.role == Role.STUDENT).first()

        if not student:
            # raise HTTPException(status_code=404, detail=f"Student with ID {student_id} not found or is not a student")
            continue

        course_student = models.CourseStudent(course_id=course_id, student_id=student_id)
        db.add(course_student)
        added_students.append(course_student)

    db.commit()
    return added_students
#
# def get_problem_by_id(id: str, db: Session):
#     problem = db.query(models.Problem).filter(models.Problem.id == id).first()
#     if not problem:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="problem not found")
#     return problem
#
# def update_problem(id: str, request: schemas.Problem, db: Session):
#     problem = db.query(models.Problem).filter(models.Problem.id == id)
#     if not problem.first():
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
#     problem.update(request.dict(), synchronize_session=False)
#     db.commit()
#     return 'updated problem'
#
def delete_course_student(id: str, db: Session):
    course_student = db.query(models.CourseStudent).filter(models.CourseStudent.id == id)
    if not course_student.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'course_student with id {id} not found')
    course_student.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng course_student không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted course_student'

def delete_course_student(db: Session, course_student_ids: List[str]):
    statement = delete(models.CourseStudent).where(models.CourseStudent.id.in_(course_student_ids)).returning(models.CourseStudent.id)
    db.execute(statement).scalars().all()
    db.commit()
    return None