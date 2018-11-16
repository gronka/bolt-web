import UiStore from './stores/UiStore'


export function isFloat(p) {
	p = p.toString()
	const numReg = /^[0-9-]*\.?[0-9]*$/
	if (p.match(numReg)) {
		return true
	}
	return false
}


export function formatUnixTimeForEventLine(unixTime) {
	var options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'};
	var date = new Date(unixTime)
	return date.toLocaleDateString(UiStore.locale, options)
}


export function formToJson(formId) {
	let form = document.getElementById(formId)
	let obj = {}
	let elements = form.querySelectorAll( "input", "select", "textarea" )

	for (var i=0; i<elements.length; ++i) {
		let el = elements[i]
		let name = el.name
		let value = el.value

		if ( name ) {
			obj[name] = value
		}
	}

	return obj
}

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}


export function getActiveMapName() {
	var activeMapName = window.location.pathname.split("/")[1]
	if (window.location.pathname === "/") {
		activeMapName = "events"
	}
	return activeMapName
}


export class Loc {
	constructor(address, lat, lng) {
		this.address = address
		this.lat = lat
		this.lng = lng
	}
}


export function round(num, digits, decimal=true) {
	// TODO: if decimal = false
	var place = Math.pow(10, digits)
	var shifted = place * num
	var shiftedRounded = Math.round(shifted)
	return shiftedRounded / place
}
