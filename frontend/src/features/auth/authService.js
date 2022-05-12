import axios from "axios";

const API_URL = "/api/user";

const register = async (userData) => {
  const registerUserData = await axios.post(API_URL + "/register", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  console.log(registerUserData);
  if (registerUserData.data.data) {
    localStorage.setItem("user", JSON.stringify(registerUserData.data.data));
  }

  return registerUserData.data.data;
};

const login = async (userData) => {
  const loginUserData = await axios.post(API_URL + "/login", {
    email: userData.email,
    password: userData.password,
  });
  console.log(loginUserData);
  if (loginUserData.data.data) {
    localStorage.setItem("user", JSON.stringify(loginUserData.data.data));
  }

  return loginUserData.data.data;
};

const authService = {
  register,
  login,
};

export default authService;
