import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '../services/api.service';
import cacheService from '../services/cache.service';

Vue.use(Vuex);
const state = {
  searchBars: [],
};
const getters = {
  searchBars() {
    return state.searchBars;
  },
};
const mutations = {
  reset(state) {
    state.searchBars = [];
  },

  addSearchBarData(state, { searchBarObj }) {
    state.searchBars.push(searchBarObj);
  },

  updateSearchBarData(state, { searchBarIdx, searchBarObj }) {
    state.searchBars[searchBarIdx] = searchBarObj;
  },
};

const actions = {
  async fetchFilteredCountryData({ commit }, { ip, searchBarIdx }) {
    const cachedIpResult = cacheService.find(ip);
    if (cachedIpResult) {
      commit('updateSearchBarData', { searchBarIdx, searchBarObj: cachedIpResult });
      return cachedIpResult;
    }

    const countryData = await apiService.getCountryData(ip);
    if (countryData.error) {
      commit('updateSearchBarData', { searchBarIdx, searchBarObj: {} });
      return countryData;
    }

    cacheService.insert(ip, countryData);
    commit('updateSearchBarData', { searchBarIdx, searchBarObj: countryData });
    return countryData;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
