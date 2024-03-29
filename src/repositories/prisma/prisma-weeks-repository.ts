import { WeeksRepository } from "../weeks-repository"
import { prisma } from "lib/prisma"
import { generateWeeklyDepositsList } from "@/utils/generate-weekly-deposits-list"
import { Week } from "@prisma/client"

export class PrismaWeeksRepository implements WeeksRepository {
	async create(goalId: string, startsAt: Date, start: number) {
		const data = generateWeeklyDepositsList(goalId, startsAt, start)

		await prisma.week.createMany({ data })
	}

	async findById(id: string) {
		return await prisma.week.findUnique({ where: { id } })
	}

	async findManyByGoalId(goalId: string) {
		return await prisma.week.findMany({ where: { goal_id: goalId } })
	}

	async update(week: Week) {
		return await prisma.week.update({
			data: week,
			where: { id: week.id }
		})
	}
}
