from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import schemas
from ..database import get_db
from ..cruds import user
from typing import List

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.ShowUser])
async def get_user(db: Session = Depends(get_db)):
    return user.get_user_all(db)

@router.get('/{id}', response_model=schemas.ShowUser)
async def get_user_by_id(id: str, db: Session = Depends(get_db)):
    return user.get_user_by_id(id, db)

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowUser)
async def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create_user(request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: str, db: Session = Depends(get_db)):
    return user.delete_user(id, db)

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update_user(id: str, request: schemas.User, db: Session = Depends(get_db)):
    return user.update_user(id, request, db)

