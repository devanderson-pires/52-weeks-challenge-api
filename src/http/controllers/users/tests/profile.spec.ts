import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user"

describe("Profile Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to get user profile", async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { body, statusCode } = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`).send()

		expect(statusCode).toEqual(200)
		expect(body.user).toEqual(expect.objectContaining({
			email: "contato@devanderson.tech"
		}))
	})
})
