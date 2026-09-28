import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",

  timeout: 5000,

  headers: {
    Accept: "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor");
    console.log("Method:", config.method);
    console.log("URL:", config.url);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor");
    console.log("Status:", response.status);
    console.log("URL:", response.config.url);

    return response;
  },
  (error) => {
    console.log("Response Interceptor Error");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("URL:", error.config?.url);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;