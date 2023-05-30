import { PrismaWeeksRepository } from "@/repositories/prisma/prisma-weeks-repository"
import { UpdateWeekUseCase } from "../update-week"
import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"

export function makeUpdateWeekUseCase() {
	const weeksRepository = new PrismaWeeksRepository()
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new UpdateWeekUseCase(weeksRepository, goalsRepository)
	return useCase
}
