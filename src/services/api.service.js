import axios from 'axios';
const API_KEY = process.env.VUE_APP_API_KEY ? process.env.VUE_APP_API_KEY : '';
const BASE_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=`;

const getCountryData = async (ip) => {
  try {
    const response = await axios.get(BASE_URL + ip);
    return response.data;
  } catch (err) {
    return {
      error: true,
      message: err.response.data.message || err.message,
    };
  }
};

export default {
  getCountryData,
};
