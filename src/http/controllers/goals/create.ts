import { makeGoalUseCase } from "@/use-cases/factories/make-goal-use-case"
import { makeWeekUseCase } from "@/use-cases/factories/make-week-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createGoalBodySchema = z.object({
		name: z.string(),
		start: z.coerce.number(),
		startsAt: z.coerce.date()
	})

	const { name, start, startsAt } = createGoalBodySchema.parse(request.body)

	const goalUseCase = makeGoalUseCase()
	const { goal } = await goalUseCase.execute({
		name,
		start,
		startsAt,
		userId: request.user.sub
	})

	const weekUseCase = makeWeekUseCase()
	await weekUseCase.execute({ goalId: goal.id, startsAt, start })

	return reply.status(201).send()
}
