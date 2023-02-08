from fastapi import HTTPException, status


def credential_exception():
    return HTTPException(
        detail="",
        status_code=status.HTTP_401_UNAUTHORIZED,
        headers={"WWW-Authenticate": "Bearer"},
    )
