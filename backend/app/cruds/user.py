from sqlalchemy.orm import Session
from .. import models, schemas
from ..utils import Hash
from fastapi import HTTPException, status


def get_user_all(db: Session):
    users = db.query(models.User).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found users')
    return users

def get_user_by_id(id:int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f'not found {id}')
    return user
def create_user(request: schemas.User, db: Session):
    request.password = Hash.brypt(request.password)
    new_user = models.User(**request.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def delete_user(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'user with id {id} not found')
    user.delete(synchronize_session=False)
    db.commit()
    return 'delete user'

def update_user(id: str, request: schemas.User, db: Session):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    request.password = Hash.brypt(request.password)
    user.update(request.dict(), synchronize_session=False)
    #Do đó, request.dict() sẽ trả về một dictionary với các cặp key-value tương ứng với các thuộc tính của đối tượng request.
    #**request.dict() thay cho request.dict() để giải nén các giá trị từ dictionary trả về từ request.dict() và truyền chúng
    # vào phương thức update() của đối tượng blog.
    db.commit()
    return 'updated user'
