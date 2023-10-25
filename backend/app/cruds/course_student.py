from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status

def get_course_student_all(db: Session, student_id: str):
    query = db.query(models.CourseStudent)

    if student_id is not None:
        query = query.filter(models.CourseStudent.student_id == student_id)

    course_student = query.all()
    return course_student

def create_course_student(request: schemas.CourseStudent, db: Session):
    course_id = request.course_id
    student_ids = request.student_ids

    if isinstance(student_ids, str):
        student_ids = student_ids.replace(" ", "")
        student_ids = student_ids.split(",")  # Chuyển chuỗi thành danh sách nếu nó là chuỗi

    added_students = []

    for student_id in student_ids:
        student = db.query(models.User).filter(models.User.id == student_id, models.User.role == "student").first()

        if not student:
            raise HTTPException(status_code=404, detail=f"Student with ID {student_id} not found or is not a student")

        # Kiểm tra xem sinh viên đã tồn tại trong danh sách chưa
        existing_student = db.query(models.CourseStudent).filter(
            models.CourseStudent.course_id == course_id,
            models.CourseStudent.student_id == student_id
        ).first()

        if existing_student:
            raise HTTPException(status_code=400, detail=f"Student with ID {student_id} is already in the course")

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