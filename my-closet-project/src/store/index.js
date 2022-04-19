import {createStore} from "vuex"

const store = createStore({
	strict : process.env.NODE_ENV !== 'production',
	modules : {},
	state () {
		return {}
	},
	mutations : {},
	actions : {},
	getters : {}

})

export default store