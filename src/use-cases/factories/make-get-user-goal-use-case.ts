import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { GetUserGoalUseCase } from "../get-user-goal"

export function makeGetUserGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new GetUserGoalUseCase(goalsRepository)
	return useCase
}
