import { observable, action } from 'mobx'
import AxiosStore from './AxiosStore'


class CurrentProfileStore {
	@observable userUuid = "userUuidNS"
	@observable fullname = "fullnameNS"
	status = "stateNotSet"

	fetchProfile(userUuid) {
		this.status = "fetchProfile"
		AxiosStore.ax.get("/user/get/" + userUuid)
		.then((resp) => {
			this.unpackProfileFromApi(resp.data.b)
			this.setStatus("ready")
		})
	}

	setStatus(status) {
		this.status = status
	}

	@action unpackProfileFromApi(data) {
		this.userUuid = data.userUuid
		this.fullname = data.fullname
	}

}


const singleton = new CurrentProfileStore()
export default singleton
