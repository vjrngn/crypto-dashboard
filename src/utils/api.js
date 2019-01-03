import http from "./http";

export default {
  async fetchLatest() {
    const response = await http.get("/api");

    return response.data;
  },
};
