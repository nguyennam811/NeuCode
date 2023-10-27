from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db, common_parameters
from ..cruds import problem
from typing import List
from fastapi import Query

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ResponseProblem)
async def get_problem(
        db: Session = Depends(get_db),
        # search_key: str = Query(default=''),
        search_value: str = Query(default=''),
        filter_authors: List[str] = Query(default=[], alias='filter_authors'),
        filter_problem_types: List[str] = Query(default=[], alias='filter_problem_types'),
        filter_difficultys: List[str] = Query(default=[], alias='filter_difficultys'),
        common: dict = Depends(common_parameters),
):
    return problem.get_problem_all(
        db,
        # search_key=search_key,
        search_value=search_value,
        filter_authors=filter_authors,
        filter_problem_types=filter_problem_types,
        filter_difficultys=filter_difficultys,
        offset=common['offset'],
        limit=common['limit']
    )

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowProblem)
async def create_problem(request: schemas.ProblemAssignment, db: Session = Depends(get_db), course_id: str = Query(None, description="Course ID (default is None)")):
    return problem.create_problem(request, db, course_id)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowProblem)
async def get_problem_by_id(id: str, db: Session = Depends(get_db)):
    return problem.get_problem_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_problem(id: str, request: schemas.Problem, db: Session = Depends(get_db)):
    return problem.update_problem(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_problem(id: str, db: Session = Depends(get_db)):
    return problem.delete_problem(id, db)


