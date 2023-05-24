import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface DeleteUserGoalUseCaseRequest {
	goalId: string
	userId: string
}

interface DeleteUserGoalUseCaseResponse {
	goal: Goal | number
}

export class DeleteUserGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({ goalId, userId }: DeleteUserGoalUseCaseRequest): Promise<DeleteUserGoalUseCaseResponse> {
		const goal = await this.goalsRepository.deleteById(goalId, userId)

		if (!goal) throw new ResourceNotFoundError()
		
		return { goal }
	}
}
