from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import problem
from typing import List
from fastapi import Query

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowProblem])
async def get_problem(db: Session = Depends(get_db)):
    return problem.get_problem_all(db)

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


