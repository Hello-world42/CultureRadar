import api from "./api";

const authService = {
  register: async (userData) => {
    const res = await api.post("/register", userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post("/login", credentials);
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
