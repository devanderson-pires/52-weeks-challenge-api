import { randomUUID } from "node:crypto"
import { WeeksRepository } from "../weeks-repository"
import { generateWeeklyDepositsList } from "@/utils/generate-weekly-deposits-list"
import { Prisma, Week } from "@prisma/client"

export class InMemoryWeeksRepository implements WeeksRepository {
	public items: Week[] = []

	async create(goalId: string, startsAt: Date, start: number) {
		const weeks = generateWeeklyDepositsList(goalId, startsAt, start)

		weeks.map(week => this.items.push({
			id: randomUUID(),
			date: week.date,
			week: week.week,
			deposit: new Prisma.Decimal(week.deposit),
			balance: new Prisma.Decimal(week.balance),
			done: false,
			goal_id: goalId
		}))

		return this.items
	}

	async findById(id: string) {
		const week = this.items.find(item => item.id === id)

		if (!week) return null

		return week
	}

	async findManyByGoalId(goalId: string) {
		return this.items.filter(item => item.goal_id === goalId)
	}

	async update(week: Week) {
		const idx = this.items.findIndex(item => item.id === week.id)

		if (idx >= 0) this.items[idx] = week

		return week
	}
}
