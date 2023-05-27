import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeUpdateGoalUseCase } from "@/use-cases/factories/make-update-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateGoalQuerySchema = z.object({ goalId: z.string().uuid() })

	const updateGoalBodySchema = z.object({ name: z.string() })

	const { goalId } = updateGoalQuerySchema.parse(request.query)
	const { name } = updateGoalBodySchema.parse(request.body)

	try {
		const updateGoalUseCase = makeUpdateGoalUseCase()
		const { goal } = await updateGoalUseCase.execute({ goalId, name })

		return reply.status(200).send({ goal })
	} catch (error) {
		if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
	}
}
