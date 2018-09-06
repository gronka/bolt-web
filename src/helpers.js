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
