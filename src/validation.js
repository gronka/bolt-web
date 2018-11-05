export function validateByName(name, data, opts={}) {
	switch(name) {
		case "Address":
		case "Title":
		case "Venue":
			if (data.length === 0 ) {
				return ""
			}

			if (data.length < 3) {
				return name + " must be at least 3 characters."
			}
			break
		
		case "Latitude":
			if (data.length === 0 ) {
				return ""
			}
			if (data > 90 || data < -90) {
				return name + " must be between -90 and 90."
			}
			break

		case "Longitude":
			if (data.length === 0 ) {
				return ""
			}
			if (data > 180 || data < -180) {
				return name + " must be between -180 and 180."
			}
			break
	}

}
