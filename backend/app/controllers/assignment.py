from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db, common_parameters
from ..cruds import assignment
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ResponseAssignments)
async def get_assignment(
        db: Session = Depends(get_db),
        search_key: str = Query(default=''),
        search_value: str = Query(default=''),
        course_id: str = Query(default=''),
        common: dict = Depends(common_parameters),
):
    return assignment.get_assignment_all(
        db,
        search_key=search_key,
        search_value=search_value,
        course_id=course_id,
        offset=common['offset'],
        limit=common['limit']
    )

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowAssignment)
async def create_assignment(request: schemas.Assignment, db: Session = Depends(get_db)):
    return assignment.create_assignment(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowAssignment)
async def get_assignment_by_id(id: str, db: Session = Depends(get_db)):
    return assignment.get_assignment_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_assignment(id: str, request: schemas.Assignment, db: Session = Depends(get_db)):
    return assignment.update_assignment(id, request, db)

@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def delete_assignment(assignment_ids: List[str] = Query(default=[], alias='id'), db: Session = Depends(get_db)):
    return assignment.delete_assignment(db=db, assignment_ids=assignment_ids)