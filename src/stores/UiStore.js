//import { observable, action } from 'mobx'


class UiStore {
	locale = "en-US"
}

const singleton = new UiStore()
export default singleton
