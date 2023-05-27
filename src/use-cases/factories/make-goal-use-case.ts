import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { GoalUseCase } from "../goal"

export function makeGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new GoalUseCase(goalsRepository)
	return useCase
}
