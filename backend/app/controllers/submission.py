from fastapi import APIRouter, Depends, status, BackgroundTasks, Query
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db, common_parameters
from ..cruds import submission
from typing import List

router = APIRouter()

# @router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowSubmission])
# async def get_submission(db: Session = Depends(get_db)):
#     return submission.get_submission_all(db)

@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ResponseSubmission)
async def get_submission(
        db: Session = Depends(get_db),
        search_key: str = Query(default=''),
        search_value: str = Query(default=''),
        submiter_id: str = Query(default=''),
        problem_id: str = Query(default=''),
        assignment_id: str = Query(default=''),
        filter_language: List[str] = Query(default=[], alias='filter_language'),
        common: dict = Depends(common_parameters),
):
    return submission.get_submission_all(
        db,
        search_key = search_key,
        search_value = search_value,
        submiter_id=submiter_id,
        problem_id=problem_id,
        assignment_id=assignment_id,
        filter_language = filter_language,
        offset = common['offset'],
        limit = common['limit']
    )

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowSubmission)
async def create_submission(request: schemas.Submission, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return submission.create_submission(request, db, background_tasks)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowSubmission)
async def get_submission_by_id(id: str, db: Session = Depends(get_db)):
    return submission.get_submission_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_submission(id: str, request: schemas.Submission, db: Session = Depends(get_db)):
    return submission.update_submission(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_submission(id: str, db: Session = Depends(get_db)):
    return submission.delete_submission(id, db)


