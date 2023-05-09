import { Goal, Prisma } from "@prisma/client"

export interface GoalsRepository {
	create(data: Prisma.GoalUncheckedCreateInput): Promise<Goal>;
	findById(id: string): Promise<Goal | null>;
	findByUser(userId: string): Promise<Goal | null>;
}
