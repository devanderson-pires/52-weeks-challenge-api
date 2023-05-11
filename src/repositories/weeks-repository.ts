import { Week } from "@prisma/client"

export interface WeeksRepository {
	create(goalId: string, startsAt: Date, start: number): Promise<Week[]>;
	findById(id: string): Promise<Week | null>;
	findManyByGoalId(goalId: string): Promise<Week[]>;
}