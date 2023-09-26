from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status


def get_problem_all(db: Session):
    problems = db.query(models.Problem).all()
    return problems

def create_problem(request: schemas.Problem, db: Session):
    new_problem = models.Problem(**request.dict())
    db.add(new_problem)
    db.commit()
    db.refresh(new_problem)
    return new_problem

def get_problem_by_id(id: str, db: Session):
    problem = db.query(models.Problem).filter(models.Problem.id == id).first()
    if not problem:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="problem not found")
    return problem

def update_problem(id: str, request: schemas.Problem, db: Session):
    problem = db.query(models.Problem).filter(models.Problem.id == id)
    if not problem.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    problem.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated problem'

def delete_problem(id: str, db: Session):
    problem = db.query(models.Problem).filter(models.Problem.id == id)
    if not problem.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'problem with id {id} not found')
    problem.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng problem không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted problem'