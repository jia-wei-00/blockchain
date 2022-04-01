import apiCaller from "./axios.service";

const createMarketplace = (data) => {
  return apiCaller("/marketplace/createMarketplace", {
    data,
  });
};

const retrieveMarketplace = (rarity, level, sort) => {
  return apiCaller("/marketplace/retrieveMarketplace", {
    rarity,
    level,
    sort,
  });
};

export default {
  createMarketplace,
  retrieveMarketplace,
};
