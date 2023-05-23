import fastify from "fastify"
import { usersRoutes } from "./http/controllers/users/routes"
import { ZodError } from "zod"
import { env } from "./env"
import { goalsRoutes } from "./http/controllers/goals/routes"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { weeksRoutes } from "./http/controllers/weeks/routes"

export const app = fastify()

app.register(fastifyJwt, {
	cookie: {
		cookieName: "refreshToken",
		signed: false
	},
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "10m"
	}
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(goalsRoutes)
app.register(weeksRoutes)

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.format()
		})
	}

	if (env.NODE_ENV !== "production") {
		console.error(error)
	}

	return reply.status(500).send({
		message: "Internal server error"
	})
})
