from fastapi import APIRouter, Depends, HTTPException, status
from .. import models, schemas
from ..dependencies import get_db
from sqlalchemy.orm import Session
from ..utils import Hash, create_access_token

router = APIRouter()

@router.post('/login')
async def login(req: schemas.Login, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == req.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Invalid Credentials')
    if not Hash.verify_password(user.password, req.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Incorrect password')

    access_token = create_access_token(
        data={"sub": user.id, "role": user.role.to_json(), "fullname": user.fullname}
    )
    return {"access_token": access_token, "token_type": "bearer", "expires_in": 3600}