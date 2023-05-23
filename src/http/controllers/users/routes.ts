import { FastifyInstance } from "fastify"
import { register } from "./register"
import { authenticate } from "./authenticate"
import { refresh } from "./refresh"

export async function usersRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticate)
	app.post("/token/refresh", refresh)
	app.post("/users", register)
}
