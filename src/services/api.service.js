import axios from 'axios';
const API_KEY = process.env.VUE_APP_API_KEY ? process.env.VUE_APP_API_KEY : '';
const BASE_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=`;

const getCountryData = async (ip) => {
  try {
    const response = await axios.get(BASE_URL + ip);
    return filterResponse(ip, response.data);
  } catch (err) {
    const message = err.response.data ? err.response.data.message : err.message;
    return {
      error: true,
      message,
    };
  }
};

const filterResponse = (ip, response) => {
  return {
    ip,
    name: response.country_name,
    timeZoneName: response.time_zone.name,
    flagUrl: response.country_flag,
  };
};

export default {
  getCountryData,
};
