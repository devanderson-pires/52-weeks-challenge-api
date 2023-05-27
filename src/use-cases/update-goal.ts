import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateGoalUseCaseRequest {
	goalId: string
	name: string
}

interface UpdateGoalUseCaseResponse {
	goal: Goal
}

export class UpdateGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId, name }: UpdateGoalUseCaseRequest): Promise<UpdateGoalUseCaseResponse> {
		const goal = await this.goalsRepository.update(goalId, name)

		if (!goal) throw new ResourceNotFoundError()
		
		return { goal }
	}
}
