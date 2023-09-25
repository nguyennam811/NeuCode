from datetime import datetime, timedelta
from jose import jwt
from ..config import settings

SECRET_KEY = settings.SECRET_KEY
#mã hóa jwt
ALGORITHM = settings.ALGORITHM
#thuật toán để mã hóa jwt
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
#thời gian hết hạn

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
