import { makeFetchGoalWeeksUseCase } from "@/use-cases/factories/make-fetch-goal-weeks-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetchByGoal(request: FastifyRequest, reply: FastifyReply) {
	const fetchGoalWeeksParamsSchema = z.object({
		goalId: z.string().uuid()
	})

	const { goalId } = fetchGoalWeeksParamsSchema.parse(request.params)

	const fetchGoalWeeksUseCase = makeFetchGoalWeeksUseCase()

	const { weeks } = await fetchGoalWeeksUseCase.execute({ goalId })

	return reply.status(200).send({ weeks })
}
