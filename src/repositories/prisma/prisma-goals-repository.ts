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

	async findByUserId(userId: string) {
		return await prisma.goal.findFirst({ where: { user_id: userId } })
	}

	async findManyByUserId(userId: string) {
		return await prisma.goal.findMany({ where: { user_id: userId } })
	}
}
