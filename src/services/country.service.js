const getTimeZoneName = (resource) => {
  return resource.time_zone.name;
};
const getFlagUrl = (resource) => {
  return resource.country_flag;
};
const getName = (resource) => {
  return resource.country_name;
};

export default {
  getTimeZoneName,
  getFlagUrl,
  getName
};
