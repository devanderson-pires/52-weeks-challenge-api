import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { DeleteUserGoalUseCase } from "../delete-user-goal"

let goalsRepository: InMemoryGoalsRepository,
	sut: DeleteUserGoalUseCase

describe("Delete User Goal Use Case", () => {
	beforeEach(() => {
		goalsRepository = new InMemoryGoalsRepository()
		sut = new DeleteUserGoalUseCase(goalsRepository)
	})

	it("should be able to delete a goal", async () => {
		await goalsRepository.create({
			name: "Viagem para a praia",
			goal: 1378,
			start: 1,
			starts_at: new Date("2023-05-08"),
			ends_at: new Date("2024-04-29"),
			user_id: "user-1"
		})

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
			userId: "user-1"
		})

		if (typeof goal === "object") expect(goal.name).toEqual("Viagem para a França")

		expect(goalsRepository.items).toHaveLength(1)
	})
})
