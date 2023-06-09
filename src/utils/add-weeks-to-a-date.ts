import dayjs from "dayjs"

export const addWeeksToADate  = (startsAt: Date) => {
	const endsAt = dayjs(startsAt).add(51, "weeks").toDate()

	return endsAt
}
