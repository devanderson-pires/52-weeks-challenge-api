import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { DeleteUserGoalUseCase } from "../delete-user-goal"

export function makeDeleteUserGoalUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new DeleteUserGoalUseCase(goalsRepository)
	return useCase
}
