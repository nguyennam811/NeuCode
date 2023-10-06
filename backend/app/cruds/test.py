from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
from typing import List
import uuid


def get_test_all(db: Session, exercise: str):
    tests = db.query(models.Test).filter(models.Test.problem_id == exercise).all()
    return tests

# def create_test(request: schemas.Test, db: Session):
#     new_test = models.Test(**request.dict())
#     db.add(new_test)
#     db.commit()
#     db.refresh(new_test)
#     return new_test

def create_test(request: List[schemas.Test], db: Session):

    new_tests = [models.Test(id=str(uuid.uuid4()), **test.dict()) for test in request]
    for new_test in new_tests:
        db.add(new_test)  # Thêm từng đối tượng vào session

    db.commit()  # Commit một lần duy nhất để lưu các thay đổi vào cơ sở dữ liệu

    # Sau khi commit, bạn có thể refresh từng đối tượng nếu cần thiết
    for new_test in new_tests:
        db.refresh(new_test)

    return new_tests

def get_test_by_id(id: str, db: Session):
    test = db.query(models.Test).filter(models.Test.id == id).first()
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")
    return test

def update_test(id: str, request: schemas.Test, db: Session):
    test = db.query(models.Test).filter(models.Test.id == id)
    if not test.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    test.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated test'

def delete_test(id: str, db: Session):
    test = db.query(models.Test).filter(models.Test.id == id)
    if not test.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'test with id {id} not found')
    test.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng test không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted test'