import axios from "axios";

const API_URL = "http://localhost:8090/api/auth/";

const register = (name, email, hashed_password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    hashed_password,
  });
};

const login = (name, hashed_password) => {
  return axios
    .post(API_URL + "signin", {
      name,
      hashed_password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
