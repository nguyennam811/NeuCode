from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status


def get_exercise_all(db: Session):
    exercises = db.query(models.Exercise).all()
    return exercises

def create_exercise(request: schemas.Exercise, db: Session):
    new_exercise = models.Exercise(**request.dict())
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise

def get_exercise_by_id(id: str, db: Session):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == id).first()
    if not exercise:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="exercise not found")
    return exercise

def update_exercise(id: str, request: schemas.Exercise, db: Session):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == id)
    if not exercise.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    exercise.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated exercise'

def delete_exercise(id: str, db: Session):
    exercise = db.query(models.Exercise).filter(models.Exercise.id == id)
    if not exercise.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'exercise with id {id} not found')
    exercise.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng exercise không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted exercise'