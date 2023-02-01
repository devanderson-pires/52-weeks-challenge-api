from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    TOKEN_EXPIRES_DAYS: int
    DB_URL: str
    HOST: str
    PORT: int

    class Config:
        env_file = ".env"


settings = Settings()
