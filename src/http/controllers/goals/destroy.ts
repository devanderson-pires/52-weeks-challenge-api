import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeDeleteGoalUseCase } from "@/use-cases/factories/make-delete-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
	const deleteGoalQuerySchema = z.object({
		goalId: z.string().uuid()
	})

	const { goalId } = deleteGoalQuerySchema.parse(request.query)

	try {
		const deleteGoalUseCase = makeDeleteGoalUseCase()
		await deleteGoalUseCase.execute({ goalId, userId: request.user.sub })

		return reply.status(204).send()
	} catch (error) {
		if (error instanceof ResourceNotFoundError) return reply.status(404).send({ message: error.message })
		throw error
	}
}
