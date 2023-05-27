import { makeUpdateUserGoalUseCase } from "@/use-cases/factories/make-update-user-goal-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateGoalBodySchema = z.object({
		goalId: z.string().uuid(),
		name: z.string()
	})

	const { goalId, name } = updateGoalBodySchema.parse(request.body)

	const updateUserGoalUseCase = makeUpdateUserGoalUseCase()
	const { goal } = await updateUserGoalUseCase.execute({ goalId, name })

	return reply.status(200).send({ goal })
}
