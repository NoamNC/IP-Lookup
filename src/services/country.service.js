const getTimeZoneName = (resource) => {
  return resource.time_zone.name;
};
const getFlagUrl = (resource) => {
  return resource.country_flag;
};

export default {
  getTimeZoneName,
  getFlagUrl,
};
