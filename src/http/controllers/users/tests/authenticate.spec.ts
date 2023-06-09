import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

describe("Authenticate Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to authenticate", async () => {
		const data = {
			email: "contato@devanderson.tech",
			password: "12345678"
		}
    
		await request(app.server).post("/users").send({
			name: "Anderson",
			...data
		})

		const { body, statusCode } = await request(app.server).post("/sessions").send(data)

		expect(statusCode).toEqual(200)
		expect(body).toEqual({
			token: expect.any(String)
		})
	})
})
