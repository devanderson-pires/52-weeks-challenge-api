import { Prisma } from "@prisma/client"
import { GoalsRepository } from "../goals-repository"
import { prisma } from "lib/prisma"

export class PrismaGoalsRepository implements GoalsRepository {
	async create(data: Prisma.GoalUncheckedCreateInput) {
		return await prisma.goal.create({ data })
	}

	async findById(id: string) {
		return await prisma.goal.findUnique({ where: { id } })
	}

	async deleteByIdAndUserId(id: string, userId: string) {
		const { count } = await prisma.goal.deleteMany({ where: { id, user_id: userId } })

		return count
	}

	async findManyByUserId(userId: string) {
		return await prisma.goal.findMany({ where: { user_id: userId } })
	}

	async update(id: string, name?: string, weeksRemaining?: number, reached?: number) {
		const goal = await prisma.goal.findUnique({ where: { id } })

		if (goal) {
			if (name && !weeksRemaining && !reached) {
				return await prisma.goal.update({
					data: { name },
					where: { id }
				})
			} else if (!name && weeksRemaining && reached !== undefined) {
				return await prisma.goal.update({
					data: { weeks_remaining: weeksRemaining, reached },
					where: { id }
				})
			}
		}

		return null
	}
}
