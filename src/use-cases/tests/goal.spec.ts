import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { GoalUseCase } from "../goal"

let goalsRepository: InMemoryGoalsRepository,
	sut: GoalUseCase

describe("Goal Use Case", () => {
	beforeEach(() => {
		goalsRepository = new InMemoryGoalsRepository()
		sut = new GoalUseCase(goalsRepository)
	})

	it("should be able to create a goal", async () => {
		const { goal } = await sut.execute({
			name: "Viagem para a praia",
			start: 1,
			starts_at: new Date("2023-05-08"),
			user_id: "user-1"
		})

		expect(goal.id).toEqual(expect.any(String))
	})

	it("should be \"ends_at\" with a year addition minus one week", async () => {
		const { goal } = await sut.execute({
			name: "Viagem para a praia",
			start: 1,
			starts_at: new Date("2023-05-08"),
			user_id: "user-1"
		})

		expect(goal.ends_at).toEqual(new Date("2024-04-29"))
	})

	it("should be \"goal\" equal R$1.378 if \"start\" equal R$1", async () => {
		const { goal } = await sut.execute({
			name: "Viagem para a praia",
			start: 1,
			starts_at: new Date("2023-05-08"),
			user_id: "user-1"
		})

		expect(goal.goal.toNumber()).toEqual(1378)
	})
})
