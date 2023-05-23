import { FastifyInstance } from "fastify"
import { register } from "./register"
import { authenticate } from "./authenticate"
import { refresh } from "./refresh"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { profile } from "./profile"

export async function usersRoutes(app: FastifyInstance) {
	app.post("/sessions", authenticate)
	app.post("/token/refresh", refresh)
	app.post("/users", register)

	app.get("/me", { onRequest: [verifyJwt] }, profile)
}
