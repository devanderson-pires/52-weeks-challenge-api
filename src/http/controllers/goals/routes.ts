import { FastifyInstance } from "fastify"
import { create } from "./create"
import { fetchByUser } from "./fetch-by-user"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { destroy } from "./destroy"
import { getByUser } from "./get-by-user"
import { update } from "./update"

export async function goalsRoutes(app: FastifyInstance) {
	app.delete("/goals", { onRequest: [verifyJwt] }, destroy)

	app.get("/goals", { onRequest: [verifyJwt] }, fetchByUser)
	app.get("/goals/:goalId", { onRequest: [verifyJwt] }, getByUser)

	app.post("/goals", { onRequest: [verifyJwt] }, create)
	app.patch("/goals", { onRequest: [verifyJwt] }, update)
}
