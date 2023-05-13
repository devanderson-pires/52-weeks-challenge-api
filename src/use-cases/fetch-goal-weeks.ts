import { WeeksRepository } from "@/repositories/weeks-repository"
import { Week } from "@prisma/client"

interface FetchGoalWeeksUseCaseRequest {
	goalId: string
}

interface FetchGoalWeeksUseCaseResponse {
	weeks: Week[]
}

export class FetchGoalWeeksUseCase {
	constructor(private weeksRepository: WeeksRepository) {}

	async execute({ goalId }: FetchGoalWeeksUseCaseRequest): Promise<FetchGoalWeeksUseCaseResponse> {
		const weeks = await this.weeksRepository.findManyByGoalId(goalId)

		return { weeks }
	}
}
