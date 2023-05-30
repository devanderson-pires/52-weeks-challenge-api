import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { fetchByGoal } from "./fetch-by-goal"
import { update } from "./update"

export async function weeksRoutes(app: FastifyInstance) {
	app.get("/goals/:goalId/weeks", { onRequest: [verifyJwt] }, fetchByGoal)
	app.patch("/goals/:goalId/weeks", { onRequest: [verifyJwt] }, update)
}
