import { GoalsRepository } from "@/repositories/goals-repository"
import { sumWeeklyDeposits } from "@/utils/sum-weekly-deposits"
import { Goal } from "@prisma/client"
import dayjs from "dayjs"

interface GoalUseCaseRequest {
	name: string
	start: number
	startsAt: Date
	userId: string
}

interface GoalUseCaseResponse {
	goal: Goal
}

export class GoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute(data: GoalUseCaseRequest): Promise<GoalUseCaseResponse> {
		const endsAt = dayjs(data.startsAt).add(51, "weeks").toDate()
		const saveInOneYear  = sumWeeklyDeposits(data.start)
		
		const goal = await this.goalsRepository.create({
			name: data.name,
			goal: saveInOneYear,
			start: data.start,
			starts_at: data.startsAt,
			ends_at: endsAt,
			user_id: data.userId
		})

		return { goal }
	}
}
