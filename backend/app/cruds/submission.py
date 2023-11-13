from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status, BackgroundTasks
from ..utils import execute_code
from datetime import datetime, timezone
from typing import List
from sqlalchemy import select, text, func, delete

def get_submissions_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.Submission).join(models.Problem, models.Submission.problem_id == models.Problem.id).join(models.User, models.Submission.submiter_id == models.User.id).where(text(' and '.join(conditions))).offset(
        offset).limit(limit).order_by(models.Submission.created.desc())
    return db.execute(statement).scalars().all()

def count_submission_with_conditions(db: Session, conditions):
    return db.query(func.count(models.Submission.id)).join(models.Problem, models.Submission.problem_id == models.Problem.id).join(models.User, models.Submission.submiter_id == models.User.id).where(text(' and '.join(conditions))).scalar()

def get_submission_all(
        db: Session,
        search_key: str,
        search_value: str,
        submiter_id: str,
        problem_id: str,
        assignment_id: str,
        filter_language: List[str],
        offset: int = 0,
        limit: int = 50,
):
    # submissions = db.query(models.Submission).all()
    # return submissions
    conditions = []

    arr = [
        [f"language = '{language}'" for language in filter_language],
    ]
    for item in arr:
        temp = ' or '.join(item)
        if temp != '':
            conditions.append('(' + temp + ')')

    if submiter_id:
        conditions.append(f"submiter_id = '{submiter_id}'")

    if problem_id:
        conditions.append(f"problem_id = '{problem_id}'")

    # if assignment_id:
    #     conditions.append(f"assignment_id = '{assignment_id}'")

    if assignment_id and assignment_id.lower() != 'null':
        conditions.append(f"assignment_id = '{assignment_id}'")
    else:
        conditions.append("assignment_id IS NULL")  # Add condition to filter out null assignments

    if search_value != '':
        conditions.append(f"cast({search_key} as varchar) like('%{search_value}%')")
    print(conditions)

    return {
        'data': get_submissions_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_submission_with_conditions(db=db, conditions=conditions)
    }

# def create_submission(request: schemas.Submission, db: Session, background_tasks: BackgroundTasks):
#     new_submission = models.Submission(**request.dict())
#     new_submission.status = "đã nộp"
#     db.add(new_submission)
#     db.commit()
#     db.refresh(new_submission)
#
#     background_tasks.add_task(execute_code, db, new_submission.id)
#
#     return new_submission

def create_submission(request: schemas.Submission, db: Session, background_tasks: BackgroundTasks):
    if request.assignment_id:
        assignment = db.query(models.Assignment).filter(models.Assignment.id == request.assignment_id).first()

        if assignment:
            if assignment.deadline and datetime.now(timezone.utc) > assignment.deadline:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Không thể nộp bài sau hạn chót.")

    new_submission = models.Submission(**request.dict())
    new_submission.status = "đã nộp"
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)

    background_tasks.add_task(execute_code, db, new_submission.id)

    return new_submission

def get_submission_by_id(id: str, db: Session):
    submission = db.query(models.Submission).filter(models.Submission.id == id).first()
    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
    return submission

def update_submission(id: str, request: schemas.Submission, db: Session):
    submission = db.query(models.Submission).filter(models.Submission.id == id)
    if not submission.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    submission.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated submission'

# def delete_submission(id: str, db: Session):
#     submission = db.query(models.Submission).filter(models.Submission.id == id)
#     if not submission.first():
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'submission with id {id} not found')
#     submission.delete(synchronize_session=False)
#     # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng submission không cần được đồng bộ hóa
#     # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
#     # huống đồng bộ hóa không cần thiết
#     db.commit()
#     return 'deleted submission'

def delete_submission(db: Session, submission_ids: List[str]):
    statement = delete(models.Submission).where(models.Submission.id.in_(submission_ids)).returning(models.Submission.id)
    db.execute(statement).scalars().all()
    db.commit()
    return None