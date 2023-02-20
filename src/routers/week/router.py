from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import SessionLocal
from src.models.goal import Goal
from src.models.user import User
from src.models.week import Week
from src.routers.auth.router import get_current_user
from src.routers.week.schemas import EditWeek
from src.routers.week.schemas import Week as WeekSchema

router = APIRouter(prefix="/goals/{goal_id}/weeks")


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=List[WeekSchema])
async def index(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    weeks: List[Week] = db.query(Week).filter(Week.goal_id == goal_id).all()

    return weeks


@router.put("/{week_id}", status_code=status.HTTP_200_OK)
async def update(
    goal_id: int,
    week_id: int,
    week: EditWeek,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    update_goal: Goal = (
        db.query(Goal)
        .filter(Goal.id == goal_id)
        .filter(Goal.user_id == current_user.id)
        .first()
    )

    if not update_goal:
        raise HTTPException(
            detail="Goal not found", status_code=status.HTTP_404_NOT_FOUND
        )

    update_week: Week = (
        db.query(Week)
        .filter(Week.id == week_id)
        .filter(Week.goal_id == goal_id)
        .first()
    )

    if not update_week:
        raise HTTPException(
            detail="Week not found", status_code=status.HTTP_404_NOT_FOUND
        )

    if week.done and not update_week.done:
        update_goal.reached = update_goal.reached + update_week.deposit
    elif not week.done and update_week.done and update_goal.reached != 0:
        update_goal.reached = update_goal.reached - update_week.deposit

    if week.done and not update_week.done and update_goal.weeks_remaining <= 52:
        update_goal.weeks_remaining = update_goal.weeks_remaining - 1
    elif not week.done and update_week.done and update_goal.weeks_remaining < 52:
        update_goal.weeks_remaining = update_goal.weeks_remaining + 1

    update_week.done = week.done

    db.commit()

    return JSONResponse(
        content="Week updated successfully", status_code=status.HTTP_200_OK
    )
