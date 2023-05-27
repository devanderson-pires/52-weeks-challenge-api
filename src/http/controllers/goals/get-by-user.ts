import { makeGetUserGoalUseCase } from "@/use-cases/factories/make-get-user-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getByUser(request: FastifyRequest, reply: FastifyReply) {
	const getUserGoalParamsSchema = z.object({
		goalId: z.string().uuid()
	})

	const { goalId } = getUserGoalParamsSchema.parse(request.params)

	const getUserGoalUseCase = makeGetUserGoalUseCase()
	const { goal } = await getUserGoalUseCase.execute({ goalId })

	return reply.status(200).send({ goal })
}
