import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user"

describe("Create Goal Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to create a goal", async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { statusCode } = await request(app.server)
			.post("/goals")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Viagem para a praia",
				start: 1,
				startsAt: new Date("2023-06-08"),
			})

		expect(statusCode).toEqual(201)
	})
})
