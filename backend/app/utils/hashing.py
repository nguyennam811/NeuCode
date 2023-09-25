from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hash():
    def brypt(password:str):
        return pwd_context.hash(password)

    def verify_password(hashed_password, plain_password):
        #hashed_password: mkhau đã băm
        #plain_password: mkhau ng dùng nhập vào
        return pwd_context.verify(plain_password, hashed_password)