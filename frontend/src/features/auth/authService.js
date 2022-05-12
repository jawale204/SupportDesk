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

const authService = {
  register,
};

export default authService;
