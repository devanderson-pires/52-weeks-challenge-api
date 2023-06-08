import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

describe("Register Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to register", async () => {
		const { statusCode } = await request(app.server).post("/users").send({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		expect(statusCode).toEqual(201)
	})
})
