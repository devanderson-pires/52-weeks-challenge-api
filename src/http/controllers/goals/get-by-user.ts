import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeGetGoalUseCase } from "@/use-cases/factories/make-get-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getByUser(request: FastifyRequest, reply: FastifyReply) {
	const getGoalParamsSchema = z.object({
		goalId: z.string().uuid()
	})

	const { goalId } = getGoalParamsSchema.parse(request.params)

	try {
		const getGoalUseCase = makeGetGoalUseCase()
		const { goal } = await getGoalUseCase.execute({ goalId })

		return reply.status(200).send({ goal })
	} catch (error) {
		if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
		throw error
	}
}
