from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status, BackgroundTasks
from ..utils import execute_code
from datetime import datetime, timezone

def get_submission_all(db: Session):
    submissions = db.query(models.Submission).all()
    return submissions

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

def delete_submission(id: str, db: Session):
    submission = db.query(models.Submission).filter(models.Submission.id == id)
    if not submission.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'submission with id {id} not found')
    submission.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng submission không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted submission'