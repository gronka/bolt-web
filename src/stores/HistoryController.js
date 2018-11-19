class HistoryController {
	constructor(opts) {
		this.hist = "histNS"
	}

	storeHistoryRef(hist) {
		this.hist = hist
	}

	redirect(path="/emptyPage") {
		if (this.hist !== "histNS") {
			this.hist.push(path)
		}
	}
}


const singleton = new HistoryController()
export default singleton
