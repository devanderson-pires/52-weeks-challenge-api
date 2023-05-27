import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { FetchGoalsUseCase } from "../fetch-goals"

export function makeFetchGoalsUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new FetchGoalsUseCase(goalsRepository)
	return useCase
}
