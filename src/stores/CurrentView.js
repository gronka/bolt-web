import { computed, observable, action } from 'mobx'
import AxiosStore from './AxiosStore'

import EventListCache from './EventListCache'


class CurrentProfileStore {
	@observable mapNamesToKeys = {}
	@observable eventLists = {}

}


const singleton = new CurrentProfileStore()
export default singleton
