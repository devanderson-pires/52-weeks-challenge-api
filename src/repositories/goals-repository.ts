import { Goal, Prisma } from "@prisma/client"

export interface GoalsRepository {
	create(data: Prisma.GoalUncheckedCreateInput): Promise<Goal>
	deleteById(id: string, userId: string): Promise<Goal | null | number>
	findById(id: string): Promise<Goal | null>
	findManyByUserId(userId: string): Promise<Goal[]>
}
