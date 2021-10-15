import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeLabel: null,
  },
  mutations: {
    updateActiveLabel(state, label) {
      state.activeLabel = label;
    },
  },
  getters: {
    activeLabel: (state) => state.activeLabel,
  },
});
