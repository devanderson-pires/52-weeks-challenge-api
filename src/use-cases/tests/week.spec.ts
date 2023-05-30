import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryWeeksRepository } from "@/repositories/in-memory/in-memory-weeks-repository"
import { WeekUseCase } from "../week"

let weeksRepository: InMemoryWeeksRepository,
	sut: WeekUseCase

describe("Week Use Case", () => {
	beforeEach(() => {
		weeksRepository = new InMemoryWeeksRepository()
		sut = new WeekUseCase(weeksRepository)
	})

	it("should be able to create 52 weeks", async () => {
		const { weeks } = await sut.execute({
			goalId: "goal-1",
			startsAt: new Date("2023-05-08"),
			start: 1
		})

		expect(weeks).toHaveLength(52)
	})
})
