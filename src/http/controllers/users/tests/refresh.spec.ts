import { app } from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

describe("Refresh Token Controller (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it("should be able to refresh a token", async () => {
		const data = {
			email: "contato@devanderson.tech",
			password: "12345678"
		}

		await request(app.server).post("/users").send({
			name: "Anderson",
			...data
		})

		const authResponse = await request(app.server).post("/sessions").send(data)

		const cookies = authResponse.get("Set-Cookie")

		const response = await request(app.server)
			.post("/token/refresh")
			.set("Cookie", cookies)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String)
		})
		expect(response.get("Set-Cookie")).toEqual([expect.stringContaining("refreshToken=")])
	})
})
