import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetUserGoalUseCaseRequest {
	goalId: string
}

interface GetUserGoalUseCaseResponse {
	goal: Goal
}

export class GetUserGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId }: GetUserGoalUseCaseRequest): Promise<GetUserGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId)

		if (!goal) throw new ResourceNotFoundError()

		return { goal }
	}
}
