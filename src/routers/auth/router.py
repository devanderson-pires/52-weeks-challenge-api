from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pytz import timezone
from sqlalchemy.orm import Session

from config import settings
from database import SessionLocal
from src.models.user import User
from src.routers.auth.exceptions import credential_exception
from src.routers.auth.schemas import CreateUser
from src.routers.auth.schemas import User as UserSchema

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(prefix="/users", tags=["User"])


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def create_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(password, hashed_password)


def authenticate(db: Session, email: str, password: str) -> Optional[User]:
    user: User = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


def _create_token(type: str, exp_time: timedelta, sub: str) -> str:
    exp = datetime.now(tz=timezone("America/Sao_Paulo")) + exp_time

    payload = {
        "typ": type,
        "exp": exp,
        "iat": datetime.now(timezone("America/Sao_Paulo")),
        "sub": sub,
    }

    return jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)


def create_access_token(sub: str) -> str:
    return _create_token(
        type="bearer", exp_time=timedelta(days=settings.TOKEN_EXPIRES_DAYS), sub=sub
    )


async def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_schema)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")

        if not username:
            raise credential_exception()
    except JWTError:
        raise credential_exception()

    user = db.query(User).filter(User.email == username).first()
    return user


@router.post("/access-token")
async def login(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> JSONResponse:
    user = authenticate(db=db, email=form_data.username, password=form_data.password)

    if not user:
        raise credential_exception()

    access_token = create_access_token(sub=user.email)
    return JSONResponse(content={"access_token": access_token, "type": "bearer"})


@router.post("/create", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def create(user: CreateUser, db: Session = Depends(get_db)) -> JSONResponse:
    try:
        new_user = User(
            name=user.name.lower(),
            email=user.email.lower(),
            password=create_password_hash(user.password),
        )
        db.add(new_user)
        db.commit()

        return JSONResponse(
            content="User created successfully", status_code=status.HTTP_201_CREATED
        )
    except:
        raise HTTPException(
            detail="E-mail already exists", status_code=status.HTTP_400_BAD_REQUEST
        )
