import { GoalsRepository } from "@/repositories/goals-repository"
import { Goal } from "@prisma/client"
import dayjs from "dayjs"

interface GoalUseCaseRequest {
	name: string,
	start: number,
	starts_at: Date,
	user_id: string
}

interface GoalUseCaseResponse {
	goal: Goal
}

export class GoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute(data: GoalUseCaseRequest): Promise<GoalUseCaseResponse> {
		const endsAt = dayjs(data.starts_at).add(51, "weeks").toDate()

		let saveInOneYear = 0
		for (let week = 1; week <= 52 ; week++) {
			const weeklyDeposit = data.start * week
	
			saveInOneYear += weeklyDeposit
		}
		
		const goal = await this.goalsRepository.create({
			name: data.name,
			goal: saveInOneYear,
			start: data.start,
			starts_at: data.starts_at,
			ends_at: endsAt,
			user_id: data.user_id
		})

		return { goal }
	}
}
