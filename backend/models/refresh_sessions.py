#backend/models/refresh_sessions.py
from datetime import datetime
from typing import Optional
from sqlalchemy import Boolean, String, Integer, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.db.session import Base
class RefreshSession(Base):
    __tablename__ = "refresh_sessions"
    
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
        )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), 
        nullable=False,
        index=True
        )
    token_hash: Mapped[str] = mapped_column(
        String(255), 
        nullable = False,
        index = True
    )
    created_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        default = datetime.utcnow, 
        nullable = True
        )
    expires_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True)
        )
    user_agent: Mapped[str | None] = mapped_column(
        String(512),
        nullable = True
    )
    ip: Mapped[str | None] = mapped_column(
        String(64),
        nullable = True
    )
    is_revoked: Mapped[bool] = mapped_column(
        Boolean,
        nullable = False,
        default = False
    )