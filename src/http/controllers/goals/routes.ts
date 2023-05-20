import { FastifyInstance } from "fastify"
import { create } from "./create"
import { fetchByUser } from "./fetch-by-user"

export async function goalsRoutes(app: FastifyInstance) {
	app.post("/goals", create)
	app.get("/goals", fetchByUser)
}
