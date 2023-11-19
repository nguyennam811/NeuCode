from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from sqlalchemy import select, text, func, delete
from typing import List

def get_all_courses_admin(db: Session):
    return db.query(models.Course).all()
def get_courses_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.Course).where(text(' and '.join(conditions))).offset(
        offset).limit(limit).order_by(models.Course.created.desc())
    return db.execute(statement).scalars().all()

def count_course_with_conditions(db: Session, conditions):
    return db.query(func.count(models.Course.id)).where(text(' and '.join(conditions))).scalar()
def get_course_all(
        db: Session,
        search_key: str,
        search_value: str,
        teacher_id: str,
        offset: int = 0,
        limit: int = 30,
):
    # courses = db.query(models.Course).all()
    # return courses
    # statement = select(models.Course).offset(offset).limit(limit).order_by(
    #     models.Course.created)
    # return db.execute(statement).scalars().all()

    # arr = [
    #     f"teacher_id = '{teacher_id}'",
    # ]
    # conditions = []
    # for item in arr:
    #     if isinstance(item, str):  # Kiểm tra nếu item là chuỗi
    #         conditions.append('(' + item + ')')
    conditions = []
    if teacher_id:
        conditions.append(f"teacher_id = '{teacher_id}'")

    if search_value != '':
        conditions.append(f"cast({search_key} as varchar) like('%{search_value}%')")
    print(conditions)

    return {
        'data': get_courses_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_course_with_conditions(db=db, conditions=conditions)
    }

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


def delete_course(db: Session, course_ids: List[str]):
    statement = delete(models.Course).where(models.Course.id.in_(course_ids)).returning(models.Course.id)
    db.execute(statement).scalars().all()
    db.commit()
    return None