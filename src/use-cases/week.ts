import { WeeksRepository } from "@/repositories/weeks-repository"
import { Week } from "@prisma/client"

interface WeekUseCaseRequest {
	goalId: string,
	start: number,
	startsAt: Date
}

interface WeekUseCaseResponse {
	weeks: Week[] | void
}

export class WeekUseCase {
	constructor(private weeksRepository: WeeksRepository) {}

	async execute({ goalId, startsAt, start }: WeekUseCaseRequest): Promise<WeekUseCaseResponse> {
		const weeks = await this.weeksRepository.create(goalId, startsAt, start)

		return { weeks }
	}
}
