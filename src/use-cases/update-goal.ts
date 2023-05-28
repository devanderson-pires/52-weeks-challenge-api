import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateGoalUseCaseRequest {
	goalId: string
	name?: string
	weeksRemaining?: number
	reached?: number
}

interface UpdateGoalUseCaseResponse {
	goal: Goal
}

export class UpdateGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId, name, weeksRemaining, reached }: UpdateGoalUseCaseRequest): Promise<UpdateGoalUseCaseResponse> {
		const goal = await this.goalsRepository.update(goalId, name, weeksRemaining, reached)

		if (!goal) throw new ResourceNotFoundError()

		return { goal }
	}
}
