#backend/core/security.py
from datetime import datetime, timedelta, timezone
import jwt
import passlib.handlers.bcrypt
from passlib.context import CryptContext
from typing import Any, Dict
from backend.core.config import get_settings

passlib.handlers.bcrypt._bcrypt = None

settings = get_settings()

pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated = "auto", 
    bcrypt__ident="2b",
    bcrypt__truncate_error=True
    )

def hashed_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def _now() -> datetime:
    return datetime.now(timezone.utc)

def create_access_token(sub: str) -> str:
    now = _now()
    payload: Dict[str, Any] = {
        "sub": sub,
        "type": "access",
        "iat": now,
        "exp": now + timedelta(minutes = settings.access_token_expire_minutes),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm = settings.jwt_algorithm)

def create_refresh_token(sub: str, session_id: str) -> str:
    now = _now()
    payload: Dict[str, Any] = {
        "sub": sub,
        "sid": session_id,
        "type": "refresh",
        "iat": now,
        "exp": now + timedelta(days = settings.refresh_token_expire_days),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm = settings.jwt_algorithm)

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.jwt_secret_key, algorithms = [settings.jwt_algorithm])