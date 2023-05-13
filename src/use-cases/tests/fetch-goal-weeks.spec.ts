import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryWeeksRepository } from "@/repositories/in-memory/in-memory-weeks-repository"
import { FetchGoalWeeksUseCase } from "../fetch-goal-weeks"

let weeksRepository: InMemoryWeeksRepository,
	sut: FetchGoalWeeksUseCase

describe("Fetch Goal Weeks Use Case", () => {
	beforeEach(() => {
		weeksRepository = new InMemoryWeeksRepository()
		sut = new FetchGoalWeeksUseCase(weeksRepository)
	})

	it("should be able to fetch goal weeks", async () => {
		await weeksRepository.create("goal-1", new Date("2023-05-08"), 1)

		const { weeks } = await sut.execute({ goalId: "goal-1" })

		expect(weeks).toHaveLength(52)
	})
})
