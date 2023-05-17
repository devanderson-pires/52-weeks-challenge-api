import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { GoalUseCase } from "../goal"

export function makeGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const goalUseCase = new GoalUseCase(goalsRepository)
	return goalUseCase
}
