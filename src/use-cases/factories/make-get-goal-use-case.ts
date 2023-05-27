import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { GetGoalUseCase } from "../get-goal"

export function makeGetGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new GetGoalUseCase(goalsRepository)
	return useCase
}
