from fastapi import APIRouter, Depends, HTTPException, status
from .. import models, schemas
from ..dependencies import get_db
from sqlalchemy.orm import Session
from typing import List
from ..utils import run_code_testcase


router = APIRouter()

@router.post('/execute', status_code=status.HTTP_201_CREATED, response_model=List[schemas.ShowTestCase_Result])
async def create_execute_testcase(request: schemas.TestCase, db: Session = Depends(get_db)):
    return await run_code_testcase(request, db)