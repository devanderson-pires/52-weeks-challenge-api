import { PrismaWeeksRepository } from "@/repositories/prisma/prisma-weeks-repository"
import { WeekUseCase } from "../week"

export function makeWeekUseCase() {
	const weeksRepository = new PrismaWeeksRepository()
	const weekUseCase = new WeekUseCase(weeksRepository)
	return weekUseCase
}
