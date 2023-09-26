from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import submission
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowSubmission])
async def get_submission(db: Session = Depends(get_db)):
    return submission.get_submission_all(db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowSubmission)
async def create_submission(request: schemas.Submission, db: Session = Depends(get_db)):
    return submission.create_submission(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowSubmission)
async def get_submission_by_id(id: str, db: Session = Depends(get_db)):
    return submission.get_submission_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_submission(id: str, request: schemas.Submission, db: Session = Depends(get_db)):
    return submission.update_submission(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_submission(id: str, db: Session = Depends(get_db)):
    return submission.delete_submission(id, db)


