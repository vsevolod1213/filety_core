#backend/schemas/auth.py
from datetime import datetime
from pydantic import BaseModel, EmailStr 

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    tariff_plan: int
    daily_used_time: int

    class Config:
        from_attributes = True