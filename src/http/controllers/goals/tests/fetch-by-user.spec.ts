import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user"

describe("Fetch Goals Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to fetch goals", async () => {
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

		const { body, statusCode } = await request(app.server)
			.get("/goals")
			.set("Authorization", `Bearer ${token}`)

		expect(statusCode).toEqual(200)
		expect(body.goals).toHaveLength(2)
	})
})
