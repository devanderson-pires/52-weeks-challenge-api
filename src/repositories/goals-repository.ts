import { Goal, Prisma } from "@prisma/client"

export interface GoalsRepository {
	create(data: Prisma.GoalUncheckedCreateInput): Promise<Goal>
	deleteByIdAndUserId(id: string, userId: string): Promise<Goal | null | number>
	findById(id: string): Promise<Goal | null>
	findManyByUserId(userId: string): Promise<Goal[]>
	update(id: string, name?: string, weeksRemaining?: number, reached?: number): Promise<Goal | null>
}
