import axios, { AxiosInstance } from "axios";

import { apiUrl } from "./pocketbase";

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosClient;
