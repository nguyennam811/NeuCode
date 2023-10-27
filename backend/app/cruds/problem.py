from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from sqlalchemy import select, update, delete, and_, text, func
from typing import List
def get_problems_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.Problem).where(text(' or '.join(conditions))).offset(
        offset).limit(limit).order_by(models.Problem.created.desc())
    return db.execute(statement).scalars().all()

def count_problem_with_conditions(db: Session, conditions):
    return db.query(func.count(models.Problem.id)).where(text(' or '.join(conditions))).scalar()

def get_problem_all(
        db: Session,
        # search_key: str,
        search_value: str,
        filter_authors: List[str],
        filter_problem_types: List[str],
        filter_difficultys: List[str],
        offset: int = 0,
        limit: int = 10,
):
    arr = [
        [f"user_id = '{author}'" for author in filter_authors],
        [f"problem_type = '{problem_type}'" for problem_type in filter_problem_types],
        [f"difficulty = '{difficulty}'" for difficulty in filter_difficultys],
    ]
    conditions = []
    for item in arr:
        temp = ' or '.join(item)
        if temp != '':
            conditions.append('(' + temp + ')')

    if search_value != '':
        conditions.append(f"cast(title as varchar) like('%{search_value}%')")
    print(conditions)

    # problems = db.query(models.Problem).all()
    # return problems
    return {
        'data': get_problems_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_problem_with_conditions(db=db, conditions=conditions)
    }

def create_problem(request: schemas.ProblemAssignment, db: Session, course_id: str):
    new_problem_data = {
        "id": request.id,
        "user_id": request.user_id,
        "title": request.title,
        "difficulty": request.difficulty,
        "problem_type": request.problem_type,
        "description": request.description,
        "max_memory_limit": request.max_memory_limit,
        "max_execution_time": request.max_execution_time,
    }

    if course_id is not None:
        course = db.query(models.Course).filter(models.Course.id == course_id).first()
        if course:
            new_problem = models.Problem(**new_problem_data)
            db.add(new_problem)
            db.commit()
            db.refresh(new_problem)

            assignment_data = {
                'problem_id': new_problem.id,
                'course_id': course_id,
                'deadline': request.deadline,
                'isPublic': request.isPublic,
            }
            new_assignment = models.Assignment(**assignment_data)
            db.add(new_assignment)
            db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    else:
        new_problem = models.Problem(**new_problem_data)
        db.add(new_problem)
        db.commit()

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