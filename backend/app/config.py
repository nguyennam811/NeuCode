from typing import Any, Dict, Optional

from pydantic import BaseSettings, validator

class Settings(BaseSettings):
    PRODUCTION_DATABASE_USER: str
    PRODUCTION_DATABASE_PASSWORD: str
    PRODUCTION_DATABASE_HOST: str
    PRODUCTION_DATABASE_PORT: str
    PRODUCTION_DATABASE_NAME: str
    PRODUCTION_DATABASE_URI: Optional[str] = None

    SECRET_KEY: str
    # mã hóa jwt
    ALGORITHM: str
    # thuật toán để mã hóa jwt
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    @validator('PRODUCTION_DATABASE_URI', pre=True)
    def assemble_production_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        pgsql_user = values.get('PRODUCTION_DATABASE_USER')
        pgsql_password = values.get('PRODUCTION_DATABASE_PASSWORD')
        pgsql_host = values.get('PRODUCTION_DATABASE_HOST')
        pgsql_port = values.get('PRODUCTION_DATABASE_PORT')
        pgsql_db_name = values.get('PRODUCTION_DATABASE_NAME')
        if isinstance(v, str):
            return v
        return f"postgresql://{pgsql_user}:{pgsql_password}@{pgsql_host}:{pgsql_port}/{pgsql_db_name}"

    class Config:
        case_sensitive = True
        env_file = '.env'

settings = Settings()
