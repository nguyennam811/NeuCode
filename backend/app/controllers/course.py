from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import course
from typing import List

router = APIRouter()


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowCourse])
async def get_course(db: Session = Depends(get_db)):
    return course.get_course_all(db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowCourse)
async def create_course(request: schemas.Course, db: Session = Depends(get_db)):
    return course.create_course(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowCourse)
async def get_course_by_id(id: str, db: Session = Depends(get_db)):
    return course.get_course_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_course(id: str, request: schemas.Course, db: Session = Depends(get_db)):
    return course.update_course(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(id: str, db: Session = Depends(get_db)):
    return course.delete_course(id, db)