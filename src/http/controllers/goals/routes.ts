import { FastifyInstance } from "fastify"
import { create } from "./create"

export async function goalsRoutes(app: FastifyInstance) {
	app.post("/goals", create)
}
