const axios = require("axios");

export default axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
