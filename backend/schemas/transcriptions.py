#backend/schemas/transcriptions.py
from pydantic import BaseModel
from datetime import datetime

class TranscriptionItem(BaseModel):
    id: int
    created_at: datetime
    status: str
    text: str

    class Config:
        orm_mode = True