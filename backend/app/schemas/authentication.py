from pydantic import BaseModel

class Login(BaseModel):
    id: str
    password: str

class ChangePassword(BaseModel):
    id: str
    password: str
    newPassword: str
    confirmedPassword: str