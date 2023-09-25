from pydantic import BaseModel
from typing import List, Optional
# from .Blog import Showblog
from ..models import Role
class User(BaseModel):
    id: str
    fullname: str
    email: str
    password: str
    role: Role

class ShowUser(User):
    class Config():
        orm_mode = True