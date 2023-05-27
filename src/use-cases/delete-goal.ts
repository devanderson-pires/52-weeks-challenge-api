import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface DeleteGoalUseCaseRequest {
	goalId: string
	userId: string
}

interface DeleteGoalUseCaseResponse {
	goal: Goal | number
}

export class DeleteGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId, userId }: DeleteGoalUseCaseRequest): Promise<DeleteGoalUseCaseResponse> {
		const goal = await this.goalsRepository.deleteByIdAndUserId(goalId, userId)

		if (!goal) throw new ResourceNotFoundError()
		
		return { goal }
	}
}
