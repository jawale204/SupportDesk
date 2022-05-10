const registerUser = (req, res) => {
  res.json("register user");
};

const loginUser = (req, res) => {
  res.json("login user");
};

module.exports = {
  registerUser,
  loginUser,
};
