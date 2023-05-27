import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetGoalUseCaseRequest {
	goalId: string
}

interface GetGoalUseCaseResponse {
	goal: Goal
}

export class GetGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId }: GetGoalUseCaseRequest): Promise<GetGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId)

		if (!goal) throw new ResourceNotFoundError()

		return { goal }
	}
}
