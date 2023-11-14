from sqlalchemy.orm import Session
from .. import models, schemas
from ..utils import Hash
from fastapi import HTTPException, status
from sqlalchemy import select, text, func, delete
from ..models import Role
from typing import List

# def get_user_all(db: Session, role: str):
#     users_query = db.query(models.User)
#     if role is not None:
#         users_query = users_query.filter(models.User.role == Role(role))
#     users = users_query.all()
#     if not users:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'No users found with role {role}')
#     return users

def get_users_with_conditions(db: Session, offset: int, limit: int, conditions):
    statement = select(models.User).where(text(' and '.join(conditions))).offset(
        offset).limit(limit).order_by(models.User.created.desc())
    return db.execute(statement).scalars().all()

def count_users_with_conditions(db: Session, conditions):
    return db.query(func.count(models.User.id)).where(text(' and '.join(conditions))).scalar()
def get_user_all(
        db: Session,
        search_key: str,
        search_value: str,
        role: str,
        offset: int = 0,
        limit: int = 30,
):
    conditions = []
    # print(Role[role])
    if role:
        conditions.append(f"role = '{role.upper()}'")

    if search_value != '':
        conditions.append(f"cast({search_key} as varchar) like('%{search_value}%')")
    print(conditions)

    return {
        'data': get_users_with_conditions(db=db, offset=offset, limit=limit, conditions=conditions),
        'total': count_users_with_conditions(db=db, conditions=conditions)
    }

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

# def delete_user(id: int, db: Session):
#     user = db.query(models.User).filter(models.User.id == id)
#     if not user.first():
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'user with id {id} not found')
#     user.delete(synchronize_session=False)
#     db.commit()
#     return 'deleted user'

def delete_user(db: Session, user_ids: List[str]):
    statement = delete(models.User).where(models.User.id.in_(user_ids)).returning(models.User.id)
    db.execute(statement).scalars().all()
    db.commit()
    return None

def update_user(id: str, request: schemas.User, db: Session):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    # request.password = Hash.brypt(request.password)
    user.update(request.dict(), synchronize_session=False)
    #Do đó, request.dict() sẽ trả về một dictionary với các cặp key-value tương ứng với các thuộc tính của đối tượng request.
    #**request.dict() thay cho request.dict() để giải nén các giá trị từ dictionary trả về từ request.dict() và truyền chúng
    # vào phương thức update() của đối tượng blog.
    db.commit()
    return 'updated user'
