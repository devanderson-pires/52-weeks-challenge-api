from fastapi import FastAPI

from config import settings
from src.routers.auth.router import router as auth
from src.routers.goal.router import router as goal

app = FastAPI(title="52 Weeks")

app.include_router(router=auth, tags=["User"])
app.include_router(router=goal, tags=["Goal"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host=settings.HOST, port=settings.PORT, reload=True)
