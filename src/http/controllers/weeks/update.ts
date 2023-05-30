import { makeUpdateWeekUseCase } from "@/use-cases/factories/make-update-week-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateWeekParamsSchema = z.object({ goalId: z.string().uuid() })
	
	const updateWeekBodySchema = z.object({
		done: z.boolean(),
		weekId: z.string().uuid()
	})

	const { goalId } = updateWeekParamsSchema.parse(request.params)
	const { done, weekId } = updateWeekBodySchema.parse(request.body)

	const updateWeekUseCase = makeUpdateWeekUseCase()

	const { week } = await updateWeekUseCase.execute({ goalId, weekId, done })

	return reply.status(200).send({ week })
}
