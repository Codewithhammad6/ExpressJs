// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // or your API
  withCredentials: true,
});

export default axiosInstance;
