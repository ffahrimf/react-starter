import axios from "axios";

// const apiKey = "a302283236aa465bbac8f25644b81d1f";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_APP_ENV,
  headers: { "Content-Type": "application/json" },
  params: {
    c: "Seafood",
  },
});

export default api;
