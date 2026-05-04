import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong, please try again.";

    console.log(JSON.stringify(error));

    return Promise.reject(new Error(message));
  },
);
