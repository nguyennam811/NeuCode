from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import test
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowTest])
async def get_test(db: Session = Depends(get_db), exercise: str = Header()):
    return test.get_test_all(db, exercise)

# @router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowTest)
# async def create_test(request: schemas.Test, db: Session = Depends(get_db)):
#     return test.create_test(request, db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[schemas.ShowTest])
async def create_test(request: List[schemas.Test], db: Session = Depends(get_db)):
    return test.create_test(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowTest)
async def get_test_by_id(id: str, db: Session = Depends(get_db)):
    return test.get_test_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_test(id: str, request: schemas.Test, db: Session = Depends(get_db)):
    return test.update_test(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_test(id: str, db: Session = Depends(get_db)):
    return test.delete_test(id, db)