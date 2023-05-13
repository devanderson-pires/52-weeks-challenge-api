export const sumWeeklyDeposits = (start: number) => {
	let saveInOneYear = 0

	for (let week = 1; week <= 52 ; week++) {
		const weeklyDeposit = start * week
	
		saveInOneYear += weeklyDeposit
	}

	return saveInOneYear
}
