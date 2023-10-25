from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status


def get_assignment_all(db: Session):
    assignments = db.query(models.Assignment).all()
    return assignments

def create_assignment(request: schemas.Assignment, db: Session):
    new_assignment = models.Assignment(**request.dict())
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment

def get_assignment_by_id(id: str, db: Session):
    assignment = db.query(models.Assignment).filter(models.Assignment.id == id).first()
    if not assignment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="assignment not found")
    return assignment

def update_assignment(id: str, request: schemas.Assignment, db: Session):
    assignment = db.query(models.Assignment).filter(models.Assignment.id == id)
    if not assignment.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    assignment.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated assignment'

def delete_assignment(id: str, db: Session):
    assignment = db.query(models.Assignment).filter(models.Assignment.id == id)
    if not assignment.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'assignment with id {id} not found')
    assignment.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng assignment không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted assignment'