import { PrismaGoalsRepository } from "@/repositories/prisma/prisma-goals-repository"
import { FetchUserGoalsUseCase } from "../fetch-user-goals"

export function makeFetchUserGoalsUseCase() {
	const goalsRepository = new PrismaGoalsRepository()
	const fetchUserGoalsUseCase = new FetchUserGoalsUseCase(goalsRepository)
	return fetchUserGoalsUseCase
}
