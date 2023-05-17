import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

interface Week {
	date: Date
	week: number
	deposit: Prisma.Decimal
	balance: Prisma.Decimal
    goal_id: string
}

export const generateWeeklyDepositsList = (goalId: string, startsAt: Date, start: number) => {
	let balance = 0
	const weeklyDeposits: Week[] = []

	for (let week = 1; week <= 52 ; week++) {
		const deposit = start * week

		balance += deposit

		const date = dayjs(startsAt).add(week - 1, "week").toDate()

		weeklyDeposits.push({
			date,
			week,
			deposit: new Prisma.Decimal(deposit.toString()),
			balance: new Prisma.Decimal(balance.toString()),
			goal_id: goalId
		})
	}

	return weeklyDeposits
}
