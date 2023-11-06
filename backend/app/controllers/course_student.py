from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db,common_parameters
from ..cruds import course_student
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ResponseCourseStudent)
async def get_course_student(
        db: Session = Depends(get_db),
        search_key: str = Query(default=''),
        search_value: str = Query(default=''),
        course_id: str = Query(default=''),
        student_id: str = Query(default=''),
        filter_teachers: List[str] = Query(default=[], alias='filter_teachers'),
        common: dict = Depends(common_parameters),
):
    return course_student.get_course_student_all(
        db,
        search_key = search_key,
        search_value = search_value,
        course_id = course_id,
        student_id = student_id,
        filter_teachers=filter_teachers,
        offset = common['offset'],
        limit = common['limit']
    )

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[schemas.ShowCourseStudent])
async def create_course_student(request: schemas.CourseStudent, db: Session = Depends(get_db)):
    return course_student.create_course_student(request, db)
#
# @router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowProblem)
# async def get_problem_by_id(id: str, db: Session = Depends(get_db)):
#     return problem.get_problem_by_id(id, db)
#
# @router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
# async def update_problem(id: str, request: schemas.Problem, db: Session = Depends(get_db)):
#     return problem.update_problem(id, request, db)
#
# @router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
# async def delete_course_student(id: str, db: Session = Depends(get_db)):
#     return course_student.delete_course_student(id, db)

@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def delete_course_student(course_student_ids: List[str] = Query(default=[], alias='id'), db: Session = Depends(get_db)):
    return course_student.delete_course_student(db=db, course_student_ids=course_student_ids)