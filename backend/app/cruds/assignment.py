from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from sqlalchemy import select, text, func, delete
from typing import List

def get_assignments_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.Assignment).join(models.Problem, models.Assignment.problem_id == models.Problem.id).where(text(' and '.join(conditions))).offset(
        offset).limit(limit).order_by(models.Assignment.created.desc())
    return db.execute(statement).scalars().all()

def count_assignment_with_conditions(db: Session, conditions):
    return db.query(func.count(models.Assignment.id)).join(models.Problem, models.Assignment.problem_id == models.Problem.id).where(text(' and '.join(conditions))).scalar()
def get_assignment_all(
        db: Session,
        search_key: str,
        search_value: str,
        course_id: str,
        filter_problem_types: List[str],
        filter_difficultys: List[str],
        offset: int = 0,
        limit: int = 30,
):
    # assignments = db.query(models.Assignment).all()
    # return assignments
    conditions = []

    arr = [
        [f"problem_type = '{problem_type}'" for problem_type in filter_problem_types],
        [f"difficulty = '{difficulty}'" for difficulty in filter_difficultys],
    ]
    for item in arr:
        temp = ' or '.join(item)
        if temp != '':
            conditions.append('(' + temp + ')')

    if course_id:
        conditions.append(f"course_id = '{course_id}'")

    if search_value != '':
        conditions.append(f"cast({search_key} as varchar) like('%{search_value}%')")
    print(conditions)

    return {
        'data': get_assignments_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_assignment_with_conditions(db=db, conditions=conditions)
    }

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


# def delete_assignment(db: Session, assignment_ids: List[str]):
#     statement = delete(models.Assignment).where(models.Assignment.id.in_(assignment_ids)).returning(models.Assignment.id)
#     db.execute(statement).scalars().all()
#     db.commit()
#     return None

def delete_assignment(db: Session, assignment_ids: List[str]):
    for assignment_id in assignment_ids:
        assignment = db.query(models.Assignment).filter(models.Assignment.id == assignment_id).first()

        if assignment:
            statement = delete(models.Assignment).where(models.Assignment.id == assignment_id).returning(models.Assignment.id)

            if assignment.is_public:
                db.execute(statement).scalars().all()
            else:
                problem_id = assignment.problem_id
                statement = delete(models.Problem).where(models.Problem.id == problem_id).returning(models.Problem.id)
                print(statement)
                db.execute(statement).scalars().all()

    db.commit()
    return None





