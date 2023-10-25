from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status


def get_course_all(db: Session):
    courses = db.query(models.Course).all()
    return courses

def create_course(request: schemas.Course, db: Session):
    new_course = models.Course(**request.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

def get_course_by_id(id: str, db: Session):
    course = db.query(models.Course).filter(models.Course.id == id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="course not found")
    return course

def update_course(id: str, request: schemas.Course, db: Session):
    course = db.query(models.Course).filter(models.Course.id == id)
    if not course.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    course.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated course'

def delete_course(id: str, db: Session):
    course = db.query(models.Course).filter(models.Course.id == id)
    if not course.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'course with id {id} not found')
    course.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng course không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted course'