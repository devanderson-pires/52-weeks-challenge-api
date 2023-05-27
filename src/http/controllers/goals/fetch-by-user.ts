import { makeFetchGoalsUseCase } from "@/use-cases/factories/make-fetch-goals-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function fetchByUser(request: FastifyRequest, reply: FastifyReply) {
	const fetchGoalsUseCase = makeFetchGoalsUseCase()
	const { goals } = await fetchGoalsUseCase.execute({ userId: request.user.sub })

	return reply.status(200).send({ goals })
}
