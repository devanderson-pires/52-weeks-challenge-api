import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user"
import { prisma } from "lib/prisma"

describe("Get Goal Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to get goal", async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server)
			.post("/goals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Viagem para a praia",
				start: 1,
				startsAt: new Date("2023-06-08"),
			})

		await request(app.server)
			.post("/goals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Viagem para a França",
				start: 2,
				startsAt: new Date("2023-06-08"),
			})

		const { id } = await prisma.goal.findFirstOrThrow()

		const { body, statusCode } = await request(app.server)
			.get(`/goals/${id}`)
			.set("Authorization", `Bearer ${token}`)

		expect(statusCode).toEqual(200)
		expect(body.goal).toEqual(expect.objectContaining({
			name: "Viagem para a praia"
		}))
	})
})
