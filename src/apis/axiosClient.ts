import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://to-do-app-ol3f.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
