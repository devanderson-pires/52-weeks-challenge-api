import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance) {
	const data = {
		email: "contato@devanderson.tech",
		password: "12345678"
	}

	await request(app.server).post("/users").send({
		name: "Anderson",
		...data
	})

	const { body } = await request(app.server).post("/sessions").send(data)
	const { token } = body

	return { token }
}
