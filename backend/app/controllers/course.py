from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db, common_parameters
from ..cruds import course
from typing import List

router = APIRouter()


@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ResponseCourses)
async def get_course(
        db: Session = Depends(get_db),
        search_key: str = Query(default=''),
        search_value: str = Query(default=''),
        teacher_id: str = Query(default=''),
        common: dict = Depends(common_parameters),
):
    return course.get_course_all(
        db,
        search_key=search_key,
        search_value=search_value,
        teacher_id=teacher_id,
        offset=common['offset'],
        limit=common['limit']
    )

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowCourse)
async def create_course(request: schemas.Course, db: Session = Depends(get_db)):
    return course.create_course(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowCourse)
async def get_course_by_id(id: str, db: Session = Depends(get_db)):
    return course.get_course_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_course(id: str, request: schemas.Course, db: Session = Depends(get_db)):
    return course.update_course(id, request, db)

@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(course_ids: List[str] = Query(default=[], alias='id'), db: Session = Depends(get_db)):
    return course.delete_course(db=db, course_ids=course_ids)