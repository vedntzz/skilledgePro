import os
from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-development")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # CORS settings
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./skillledge.db")
    
    class Config:
        case_sensitive = True

settings = Settings()