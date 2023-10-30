from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status


def get_test_result_all(db: Session, submission: str):
    test_results = db.query(models.Test_Result).filter(models.Test_Result.submission_id == submission).all()
    return test_results
# def get_test_result_all(db: Session):
#     test_results = db.query(models.Test_Result).all()
#     return test_results

def create_test_result(request: schemas.Test_Result, db: Session):
    new_test_result = models.Test_Result(**request.dict())
    db.add(new_test_result)
    db.commit()
    db.refresh(new_test_result)
    return new_test_result

def get_test_result_by_id(id: str, db: Session):
    test_result = db.query(models.Test_Result).filter(models.Test_Result.id == id).first()
    if not test_result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test_result not found")
    return test_result

def update_test_result(id: str, request: schemas.Test_Result, db: Session):
    test_result = db.query(models.Test_Result).filter(models.Test_Result.id == id)
    if not test_result.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'not found {id}')
    test_result.update(request.dict(), synchronize_session=False)
    db.commit()
    return 'updated test_result'

def delete_test_result(id: str, db: Session):
    test_result = db.query(models.Test_Result).filter(models.Test_Result.id == id)
    if not test_result.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'test_result with id {id} not found')
    test_result.delete(synchronize_session=False)
    # Tham số synchronize_session=False được sử dụng để chỉ định rằng đối tượng test_result không cần được đồng bộ hóa
    # với phiên làm việc (session) hiện tại. Tham số này giúp tối ưu hóa hiệu suất và tránh các tình
    # huống đồng bộ hóa không cần thiết
    db.commit()
    return 'deleted test_result'