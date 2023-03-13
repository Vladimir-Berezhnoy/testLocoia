import { createStore } from 'vuex'

export default createStore({
  state: {
    maxWinners: 10,
    todayWinnerList: [],
  },
  getters: {},
  actions: {
    setWinnerList({ state }, todayWinnerList) {
      state.todayWinnerList = todayWinnerList
    }
  },
  mutations: {
    addWinner(state, name) {
      state.todayWinnerList.push(name)
    }
  },
  modules: {}
})
