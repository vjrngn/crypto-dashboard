var axios = require("axios");

const { API_BASE, API_KEY } = process.env;

module.exports = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    "X-CMC_PRO_API_KEY": API_KEY,
  },
});
