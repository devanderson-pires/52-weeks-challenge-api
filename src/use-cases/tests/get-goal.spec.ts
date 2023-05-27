import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { GetGoalUseCase } from "../get-goal"

let goalsRepository: InMemoryGoalsRepository,
	sut: GetGoalUseCase

describe("Get Goal Use Case", () => {
	beforeEach(() => {
		goalsRepository = new InMemoryGoalsRepository()
		sut = new GetGoalUseCase(goalsRepository)
	})

	it("should be able to get goal", async () => {
		const { id } = await goalsRepository.create({
			name: "Viagem para a praia",
			goal: 1378,
			start: 1,
			starts_at: new Date("2023-05-08"),
			ends_at: new Date("2024-04-29"),
			user_id: "user-1"
		})

		await goalsRepository.create({
			name: "Viagem para a França",
			goal: 1378,
			start: 1,
			starts_at: new Date("2023-05-08"),
			ends_at: new Date("2024-04-29"),
			user_id: "user-1"
		})

		const { goal } = await sut.execute({
			goalId: id
		})

		expect(goal.name).toEqual("Viagem para a praia")
	})
})
