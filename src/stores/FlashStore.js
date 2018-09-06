import { observable, action } from 'mobx'


class FlashMsg {
	constructor(msg, severity) {
		this.msg = msg
		this.severity = severity
	}
}


class FlashStore {
	@observable msgs = []

	@action addFlash(msg, severity) {
		this.msgs.push(new FlashMsg(msg, severity))
	}

	@action clearMsgs() {
		this.msgs = []
	}

	@action removeFlash(p) {
		this.msgs.splice(p, 1)
	}

	@action unpackFlashMsgs(p) {
		if (p.flashMsgs != null) {
			for (let i=0; i<p.flashMsgs.length; i++) {
				this.addFlash(p.flashMsgs[i].msg, p.flashMsgs[i].severity)
			}
		}
	}

}


const singleton = new FlashStore()
export default singleton
