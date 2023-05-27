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
		const { count } = await prisma.goal.deleteMany({
			where: {
				id,
				user_id: userId
			}
		})

		return count
	}

	async findManyByUserId(userId: string) {
		return await prisma.goal.findMany({ where: { user_id: userId } })
	}

	async update(id: string, name: string) {
		return await prisma.goal.update({ data: { name} , where: { id } }
		)
	}
}
