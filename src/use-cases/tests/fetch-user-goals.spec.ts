import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGoalsRepository } from "@/repositories/in-memory/in-memory-goals-repository"
import { FetchUserGoalsUseCase } from "../fetch-user-goals"

let goalsRepository: InMemoryGoalsRepository,
	sut: FetchUserGoalsUseCase

describe("Fetch User Goals Use Case", () => {
	beforeEach(() => {
		goalsRepository = new InMemoryGoalsRepository()
		sut = new FetchUserGoalsUseCase(goalsRepository)
	})

	it("should be able to fetch user goals", async () => {
		await goalsRepository.create({
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

		const { goals } = await sut.execute({
			userId: "user-1"
		})

		expect(goals).toHaveLength(2)
	})
})
