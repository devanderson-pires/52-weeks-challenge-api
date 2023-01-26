from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    DB_URL: str
    HOST: str
    PORT: int

    class Config:
        env_file = ".env"


settings = Settings()
