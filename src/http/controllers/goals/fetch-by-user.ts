import { makeFetchUserGoalsUseCase } from "@/use-cases/factories/make-fetch-user-goals-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchByUser(request: FastifyRequest, reply: FastifyReply) {
	const fetchUserGoalsUseCase = makeFetchUserGoalsUseCase()
	const { goals } = await fetchUserGoalsUseCase.execute({ userId: request.user.sub })

	return reply.status(200).send({ goals })
}
