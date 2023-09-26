from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import exercise
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowExercise])
async def get_exercise(db: Session = Depends(get_db)):
    return exercise.get_exercise_all(db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowExercise)
async def create_exercise(request: schemas.Exercise, db: Session = Depends(get_db)):
    return exercise.create_exercise(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowExercise)
async def get_exercise_by_id(id: str, db: Session = Depends(get_db)):
    return exercise.get_exercise_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_exercise(id: str, request: schemas.Exercise, db: Session = Depends(get_db)):
    return exercise.update_exercise(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_exercise(id: str, db: Session = Depends(get_db)):
    return exercise.delete_exercise(id, db)


