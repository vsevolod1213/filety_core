#backend/core/relevant_day.py
from datetime import datetime, date
from zoneinfo import ZoneInfo

MOSCOW_TZ = ZoneInfo("Europe/Moscow")

def today_moscow() -> date:
    return datetime.now(MOSCOW_TZ).date()

def is_relevant_day(user) -> None:

    today = today_moscow() 

    if user.relevant_day is None or user.relevant_day != today:
        user.daily_used_time = 0
        user.relevant_day = today
    

