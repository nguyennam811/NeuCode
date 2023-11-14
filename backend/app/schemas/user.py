from pydantic import BaseModel
from typing import List, Optional
from ..models import Role
import datetime

class User(BaseModel):
    id: str
    fullname: str
    email: str
    password: str
    role: Role

class ShowUser(User):
    created: datetime.datetime
    updated: Optional[datetime.datetime]
    class Config():
        orm_mode = True

class ResponseUsers(BaseModel):
    total: int
    data: List[ShowUser]
    class Config:
        orm_mode = True