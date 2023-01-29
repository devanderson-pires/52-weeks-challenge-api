from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import SessionLocal
from models.user import User
from routers.auth.schemas import StoreUser

router = APIRouter(tags=["Users"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/users/create")
async def create(user: StoreUser, db: Session = Depends(get_db)):
    try:
        new_user = User()
        new_user.name = user.name
        new_user.email = user.email
        new_user.password = user.password

        db.add(new_user)
        db.commit()

        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=status.HTTP_400_BAD_REQUEST)
