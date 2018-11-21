export function getThreeLetterMonth(date) {
	if (!(date instanceof Date)) {
		return "monthNS"
	}

	// TODO: translations
	var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
		"OCT", "NOV", "DEC"]
	return months[date.getMonth()]
}
