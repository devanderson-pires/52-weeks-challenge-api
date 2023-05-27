import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { UpdateUserGoalUseCase } from "../update-user-goal"

export function makeUpdateUserGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new UpdateUserGoalUseCase(goalsRepository)
	return useCase
}
