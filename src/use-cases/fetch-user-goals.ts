import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"

interface FetchUserGoalsUseCaseRequest {
	userId: string
}

interface FetchUserGoalsUseCaseResponse {
	goals: Goal[]
}

export class FetchUserGoalsUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ userId }: FetchUserGoalsUseCaseRequest): Promise<FetchUserGoalsUseCaseResponse> {
		const goals = await this.goalsRepository.findManyByUserId(userId)

		return { goals }
	}
}
