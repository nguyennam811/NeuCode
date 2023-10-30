from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import test_result
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowTestResult])
async def get_test_result(db: Session = Depends(get_db), submission: str = Header()):
    return test_result.get_test_result_all(db, submission)

# @router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowTestResult])
# async def get_test_result(db: Session = Depends(get_db)):
#     return test_result.get_test_result_all(db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowTestResult)
async def create_test_result(request: schemas.Test_Result, db: Session = Depends(get_db)):
    return test_result.create_test_result(request, db)

@router.get('/{id}', status_code=status.HTTP_200_OK ,response_model=schemas.ShowTestResult)
async def get_test_result_by_id(id: str, db: Session = Depends(get_db)):
    return test_result.get_test_result_by_id(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_test_result(id: str, request: schemas.Test_Result, db: Session = Depends(get_db)):
    return test_result.update_test_result(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_test_result(id: str, db: Session = Depends(get_db)):
    return test_result.delete_test_result(id, db)