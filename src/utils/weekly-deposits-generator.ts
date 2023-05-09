import dayjs from "dayjs"

interface Week {
	date: Date
	week: number
	deposit: number
	balance: number
}

export const weeklyDepositsGenerator = (startsAt: Date, start: number) => {
	let balance = 0
	const weeklyDeposits: Week[] = []

	for (let week = 1; week <= 52 ; week++) {
		const deposit = start * week

		balance += deposit

		const date = dayjs(startsAt).add(week - 1, "week").toDate()

		weeklyDeposits.push({
			date,
			week,
			deposit,
			balance
		})
	}

	return weeklyDeposits
}
