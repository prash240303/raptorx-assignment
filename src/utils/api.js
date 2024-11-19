import axios from "axios";

const apiKey = import.meta.env.VITE_GEKO_API_KEY;

const api = axios.create({
  baseURL: `https://api.coingecko.com/api/v3`,
  params: { x_cg_demo_api_key: apiKey },
});

export default api;
