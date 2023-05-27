import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"

interface FetchGoalsUseCaseRequest {
	userId: string
}

interface FetchGoalsUseCaseResponse {
	goals: Goal[]
}

export class FetchGoalsUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ userId }: FetchGoalsUseCaseRequest): Promise<FetchGoalsUseCaseResponse> {
		const goals = await this.goalsRepository.findManyByUserId(userId)

		return { goals }
	}
}
