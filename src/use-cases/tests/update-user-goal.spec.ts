import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { UpdateUserGoalUseCase } from "../update-user-goal"

let goalsRepository: InMemoryGoalsRepository,
	sut: UpdateUserGoalUseCase

describe("Update User Goal Use Case", () => {
	beforeEach(() => {
		goalsRepository = new InMemoryGoalsRepository()
		sut = new UpdateUserGoalUseCase(goalsRepository)
	})

	it("should be able to update a goal", async () => {
		const { id } = await goalsRepository.create({
			name: "Viagem para a França",
			goal: 1378,
			start: 1.5,
			starts_at: new Date("2023-05-08"),
			ends_at: new Date("2024-04-29"),
			user_id: "user-1"
		})

		const { goal } = await sut.execute({
			goalId: id,
			name: "Viagem para a praia"
		})

		expect(goal.name).toEqual("Viagem para a praia")
	})
})
