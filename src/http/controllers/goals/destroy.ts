import { makeDeleteUserGoalUseCase } from "@/use-cases/factories/make-delete-user-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
	const deleteGoalQuerySchema = z.object({
		goalId: z.string().uuid()
	})

	const { goalId } = deleteGoalQuerySchema.parse(request.query)

	const deleteUserGoalUseCase = makeDeleteUserGoalUseCase()
	await deleteUserGoalUseCase.execute({
		goalId,
		userId: request.user.sub
	})

	return reply.status(204).send({})
}
