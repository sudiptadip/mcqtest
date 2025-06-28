import axios from "axios";

// only for client side api call
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;

async function getToken() {
  try {
    const response = await axios.get("/api/auth/get-token");
    const token = response.data.token;
    return token;
  } catch (error) {
    return null;
  }
}