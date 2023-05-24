import { Goal, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { GoalsRepository } from "../goals-repository"

export class InMemoryGoalsRepository implements GoalsRepository {
	public items: Goal[] = []

	async create(data: Prisma.GoalUncheckedCreateInput) {
		const goal = {
			id: randomUUID(),
			name: data.name,
			goal: new Prisma.Decimal(data.goal.toString()),
			start: new Prisma.Decimal(data.start.toString()),
			weeks_remaining: 52,
			reached: new Prisma.Decimal(0),
			starts_at: new Date(data.starts_at),
			ends_at: new Date(data.ends_at),
			user_id: data.user_id
		}
		this.items.push(goal)
		return goal
	}

	async deleteById(id: string, userId: string) {
		const goal = this.items.find(item => item.id === id && item.user_id === userId)

		if (!goal) return null

		this.items = this.items.filter(item => item.id !== goal.id)

		return goal
	}

	async findById(id: string) {
		const goal = this.items.find(item => item.id === id)

		if (!goal) return null

		return goal
	}

	async findManyByUserId(userId: string) {
		return this.items.filter(item => item.user_id === userId)
	}
}
