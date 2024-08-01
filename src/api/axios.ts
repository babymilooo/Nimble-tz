import axios from "axios";
const url = `https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1`;

export const $api = axios.create({
  // withCredentials: true,
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

$api.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
