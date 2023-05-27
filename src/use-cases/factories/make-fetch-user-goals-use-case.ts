import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { FetchUserGoalsUseCase } from "../fetch-user-goals"

export function makeFetchUserGoalsUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const useCase = new FetchUserGoalsUseCase(goalsRepository)
	return useCase
}
