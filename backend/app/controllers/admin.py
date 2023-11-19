from fastapi import APIRouter, Depends, status, Header, Query
from sqlalchemy.orm import Session
from .. import schemas
from ..dependencies import get_db
from ..cruds import admin
from typing import List

router = APIRouter()


@router.get('/dashboard/', status_code=status.HTTP_200_OK)
def read_devices(
        db: Session = Depends(get_db),
):
    return admin.fetch_data_for_dashboard(db=db)