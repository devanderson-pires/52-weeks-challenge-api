from fastapi import FastAPI

from config import settings
from src.routers.auth.router import router as auth
from src.routers.goal.router import router as goal
from src.routers.week.router import router as week

app = FastAPI(title="52 Weeks")

app.include_router(router=auth, tags=["User"])
app.include_router(router=goal, tags=["Goal"])
app.include_router(router=week, tags=["Week"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host=settings.HOST, port=settings.PORT, reload=True)
