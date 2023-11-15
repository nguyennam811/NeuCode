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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Incorrect Account ID')
    if not Hash.verify_password(user.password, req.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Incorrect Password')

    access_token = create_access_token(
        data={"sub": user.id, "role": user.role.to_json(), "fullname": user.fullname}
    )
    return {"access_token": access_token, "token_type": "bearer", "expires_in": 3600}

@router.put('/changepassword')
async def login(req: schemas.ChangePassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == req.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Not Found User')

    if req.newPassword != req.confirmedPassword:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f'New password and confirmed password do not match')

    if not Hash.verify_password(user.password, req.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f'Incorrect Password')

    user.password = Hash.brypt(req.newPassword)
    db.commit()

    return {"message": "Password updated successfully"}