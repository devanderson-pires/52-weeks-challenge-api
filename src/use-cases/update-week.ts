import { GoalsRepository } from "@/repositories/goals-repository"
import { WeeksRepository } from "@/repositories/weeks-repository"
import { Week } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateWeekUseCaseRequest {
	goalId: string
	weekId: string
	done: boolean
}

interface UpdateWeekUseCaseResponse {
	week: Week
}

export class UpdateWeekUseCase {
	constructor(private weeksRepository: WeeksRepository, private goalsRepository: GoalsRepository) {}

	async execute({ goalId, weekId, done }: UpdateWeekUseCaseRequest): Promise<UpdateWeekUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId)
		const week = await this.weeksRepository.findById(weekId)

		if (!goal || !week) throw new ResourceNotFoundError()

		let weeksRemaining = goal.weeks_remaining
		let reached = goal.reached.toNumber()

		if (done && !week.done && goal.weeks_remaining <= 52) {
			weeksRemaining -= 1
		} else if (!done && week.done && goal.weeks_remaining < 52) {
			weeksRemaining += 1
		}

		if (done && !week.done) {
			reached += week.deposit.toNumber()
		} else if (!done && week.done && goal.reached.toNumber() !== 0) {
			reached -= week.deposit.toNumber()
		}

		await this.goalsRepository.update(goalId, undefined, weeksRemaining, reached)

		week.done = done
		await this.weeksRepository.update(week)

		return { week }
	}
}
