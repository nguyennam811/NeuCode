from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func

class TimeModel:
    created = Column(DateTime(timezone=True), server_default=func.now())
    updated = Column(DateTime(timezone=True), onupdate=func.now())