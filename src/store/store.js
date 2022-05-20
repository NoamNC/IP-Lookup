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

  updateSearchBarData(state, { searchBarIdx, searchBarObj }) {
    state.searchBars[searchBarIdx] = searchBarObj;
  },
};

const actions = {
  async implementData({ commit }, { ip, searchBarIdx }) {
    const cachedIpResult = cacheService.find(ip);
    if (cachedIpResult) {
      commit('updateSearchBarData', { searchBarIdx, searchBarObj: cachedIpResult });
      return cachedIpResult;
    }

    const response = await apiService.getCountryData(ip);
    if (response.error) {
      return response;
    }
    
    const filteredResponse = {
      ip,
      name: countryService.getName(response),
      timeZoneName: countryService.getTimeZoneName(response),
      flagUrl: countryService.getFlagUrl(response),
    };

    cacheService.insert(ip, filteredResponse);
    commit('updateSearchBarData', { searchBarIdx, searchBarObj: filteredResponse });
    return filteredResponse;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
