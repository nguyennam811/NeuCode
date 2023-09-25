from pydantic import BaseModel

class Login(BaseModel):
    id: str
    password: str