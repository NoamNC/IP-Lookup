import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '../services/api.service';
import cacheService from '../services/cache.service';
import countryService from '../services/country.service';

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

  updateSearchBarData(state, { index, searchBarObj }) {
    state.searchBars[index] = searchBarObj;
  },
};

const actions = {
  // eslint-disable-next-line no-empty-pattern
  async sendReq({ commit }, { ip, index }) {
    const cachedIpResult = cacheService.find(ip);
    if (cachedIpResult) {
      commit('updateSearchBarData', { index, searchBarObj: cachedIpResult });
      return cachedIpResult;
    }

    const response = await apiService.getCountryInfo(ip);
    if (response.error) {
      return response;
    }

    const filteredResponse = {
      ip,
      timeZoneName: countryService.getTimeZoneName(response),
      flagUrl: countryService.getFlagUrl(response),
    };

    cacheService.insert(ip, filteredResponse);
    commit('updateSearchBarData', { index, searchBarObj: filteredResponse });
    return filteredResponse;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
