from fastapi import FastAPI

from config import settings

app = FastAPI(title="52 Weeks")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host=settings.HOST, port=settings.PORT, reload=True)
