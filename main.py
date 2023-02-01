from fastapi import FastAPI

from config import settings
from routers.auth.router import router as auth

app = FastAPI(title="52 Weeks")

app.include_router(router=auth, tags=["User"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host=settings.HOST, port=settings.PORT, reload=True)
