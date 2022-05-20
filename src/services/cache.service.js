const find = (ip) => {
  return JSON.parse(localStorage.getItem(ip));
};
const insert = (ip, result) => {
  localStorage.setItem(ip, JSON.stringify(result));
};

export default {
  find,
  insert,
};
