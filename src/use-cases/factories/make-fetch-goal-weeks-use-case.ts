import { PrismaWeeksRepository } from "@/repositories/prisma/prisma-weeks-repository"
import { FetchGoalWeeksUseCase } from "../fetch-goal-weeks"

export function makeFetchGoalWeeksUseCase() {
	const weeksRepository = new PrismaWeeksRepository()
	const useCase = new FetchGoalWeeksUseCase(weeksRepository)
	return useCase
}
