import { FastifyInstance } from "fastify"
import { create } from "./create"
import { fetchByUser } from "./fetch-by-user"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export async function goalsRoutes(app: FastifyInstance) {
	app.post("/goals", { onRequest: [verifyJwt] }, create)
	app.get("/goals", { onRequest: [verifyJwt] }, fetchByUser)
}
