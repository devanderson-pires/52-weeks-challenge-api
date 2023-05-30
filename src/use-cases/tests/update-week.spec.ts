import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryWeeksRepository } from "@/repositories/in-memory/in-memory-weeks-repository"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { UpdateWeekUseCase } from "../update-week"

let weeksRepository: InMemoryWeeksRepository,
	goalsRepository: InMemoryGoalsRepository,
	sut: UpdateWeekUseCase

describe("Update Week Use Case", () => {
	beforeEach(() => {
		weeksRepository = new InMemoryWeeksRepository()
		goalsRepository = new InMemoryGoalsRepository()
		sut = new UpdateWeekUseCase(weeksRepository, goalsRepository)
	})

	it("should be able to update a week", async () => {
		const goal = await goalsRepository.create({
			name: "Viagem para a França",
			goal: 1378,
			start: 1.5,
			starts_at: new Date("2023-05-08"),
			ends_at: new Date("2024-04-29"),
			user_id: "user-1"
		})

		const weeks = await weeksRepository.create(goal.id, goal.starts_at, goal.start.toNumber())

		const week1 = weeks[0]

		await sut.execute({ goalId: goal.id, weekId: week1.id, done: true })
		
		const week2 = weeks[1]

		const { week } = await sut.execute({ goalId: goal.id, weekId: week2.id, done: true })

		expect(week.done).toBeTruthy()
		expect(goal.weeks_remaining).toEqual(50)
		expect(goal.reached.toNumber()).toEqual(4.5)
	})
})
