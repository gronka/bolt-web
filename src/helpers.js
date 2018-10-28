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
