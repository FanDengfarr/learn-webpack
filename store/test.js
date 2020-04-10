import Vuex from 'vuex';
const mod = {
  namespaced: true,
  state: {
    blessingCards: null,
    getBlessingCardLoading: false,
    getBlessingCardDone: false
  },
  mutations: {
    getBlessingRequest (state) {
      state.getBlessingCardLoading = true
    },
    getBlessingSuccess (state, {blessingCards}) {
      state.getBlessingCardLoading = false
      state.blessingCards = blessingCards
    },
    getBlessingFailure (state) {
      state.getBlessingCardLoading = false
    }
  },
  actions: {
    getBlessingCards ({commit}) {
      commit('getBlessingRequest')
    }
  }
}
const MODULE_NAME = ['birthday']
const store = new Vuex.Store()
store.registerModule(MODULE_NAME, mod)
export default store