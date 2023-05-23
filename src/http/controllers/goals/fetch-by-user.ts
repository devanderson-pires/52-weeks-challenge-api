import { makeFetchUserGoalsUseCase } from "@/use-cases/factories/make-fetch-user-goals-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetchByUser(request: FastifyRequest, reply: FastifyReply) {
	const fetchUserGoalsQuerySchema = z.object({
		userId: z.string().uuid()
	})

	const { userId } = fetchUserGoalsQuerySchema.parse(request.query)

	const fetchUserGoalsUseCase = makeFetchUserGoalsUseCase()
	const { goals } = await fetchUserGoalsUseCase.execute({ userId })

	return reply.status(200).send({ goals })
}
