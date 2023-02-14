from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import SessionLocal
from src.models.goal import Goal
from src.models.user import User
from src.models.week import Week
from src.routers.auth.router import get_current_user
from src.routers.goal.schemas import CreateGoal, EditGoal
from src.routers.goal.schemas import Goal as GoalSchema

router = APIRouter(prefix="/goals")


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "/create",
    response_model=GoalSchema,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    goal: CreateGoal,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        ends_at = goal.starts_at + timedelta(weeks=51)
        weekly_savings = []

        for week in range(52):
            index = week - 1
            week += 1

            balance = (
                weekly_savings[index]["balance"] + (week * goal.start)
                if weekly_savings
                else week * goal.start
            )

            weekly_savings.append(
                {
                    "date": goal.starts_at + timedelta(weeks=week) - timedelta(weeks=1),
                    "week": week,
                    "deposit": week * goal.start,
                    "balance": balance,
                }
            )

        goal_amount = sum(
            weekly_deposit["deposit"] for weekly_deposit in weekly_savings
        )

        new_goal: Goal = Goal(
            name=goal.name,
            goal=goal_amount,
            start=goal.start,
            weeks_remaining=52,
            reached=0,
            starts_at=goal.starts_at,
            ends_at=ends_at,
            user_id=current_user.id,
        )
        db.add(new_goal)
        db.commit()

        for weekly_deposit in weekly_savings:
            new_week: Week = Week(
                date=weekly_deposit["date"],
                week=weekly_deposit["week"],
                deposit=weekly_deposit["deposit"],
                balance=weekly_deposit["balance"],
                goal_id=new_goal.id,
            )

            db.add(new_week)

        db.commit()

        return new_goal
    except Exception as e:
        raise HTTPException(detail=str(e))


@router.delete("/{goal_id}", status_code=status.HTTP_200_OK)
async def destroy(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    goal: Goal = (
        db.query(Goal)
        .filter(Goal.id == goal_id)
        .filter(Goal.user_id == current_user.id)
        .first()
    )

    if not goal:
        raise HTTPException(
            detail="Goal not found", status_code=status.HTTP_404_NOT_FOUND
        )

    db.delete(goal)
    db.commit()

    return JSONResponse(
        content="Goal deleted successfully", status_code=status.HTTP_200_OK
    )


@router.put("/{goal_id}", status_code=status.HTTP_200_OK)
async def update(
    goal_id: int,
    goal: EditGoal,
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

    update_goal.name = goal.name
    db.commit()

    return JSONResponse(
        content="Goal updated successfully", status_code=status.HTTP_200_OK
    )


@router.get("/", response_model=List[GoalSchema], status_code=status.HTTP_200_OK)
async def index(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    goals: List[Goal] = db.query(Goal).filter(Goal.user_id == current_user.id).all()

    return JSONResponse(content=jsonable_encoder(goals), status_code=status.HTTP_200_OK)
