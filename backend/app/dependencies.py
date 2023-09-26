from .database import SessionLocal
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def common_parameters(offset: int = 0, limit: int = 100):
    return {
        'offset': offset,
        'limit': limit
    }