import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user"
import { prisma } from "lib/prisma"
import { addWeeksToADate } from "@/utils/add-weeks-to-a-date"
import { sumWeeklyDeposits } from "@/utils/sum-weekly-deposits"

describe("Delete Goal Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to delete a goal", async () => {
		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()

		const start = 1,
			startsAt = new Date("2023-06-08"),
			goal = sumWeeklyDeposits(start),
			endsAt = addWeeksToADate(startsAt)

		const data = {
			goal,
			start,
			starts_at: startsAt,
			ends_at: endsAt,
			user_id: user.id
		}

		const { id } = await prisma.goal.create({
			data: {
				...data,
				name: "Viagem para a praia"
			}
		})

		await prisma.goal.create({
			data: {
				...data,
				name: "Viagem para a França"
			}
		})

		const { statusCode } = await request(app.server)
			.delete("/goals")
			.query({
				goalId: id
			})
			.set("Authorization", `Bearer ${token}`)

		const { body } = await request(app.server)
			.get("/goals")
			.set("Authorization", `Bearer ${token}`)

		expect(statusCode).toEqual(204)
		expect(body.goals).toHaveLength(1)
	})
})
