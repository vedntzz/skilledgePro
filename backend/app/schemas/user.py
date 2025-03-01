from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    employee_id: str
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    employee_id: str
    password: str

class UserInDB(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class User(UserInDB):
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    employee_id: Optional[str] = None