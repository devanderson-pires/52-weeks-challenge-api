import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateUserGoalUseCaseRequest {
	goalId: string
	name: string
}

interface UpdateUserGoalUseCaseResponse {
	goal: Goal
}

export class UpdateUserGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId, name }: UpdateUserGoalUseCaseRequest): Promise<UpdateUserGoalUseCaseResponse> {
		const goal = await this.goalsRepository.update(goalId, name)

		if (!goal) throw new ResourceNotFoundError()
		
		return { goal }
	}
}
