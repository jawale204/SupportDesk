const express = require("express");
const app = express();
const dotnet = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("../backend/config/db");
const { authMiddleware } = require("./middleware/authMiddleware");
var cors = require("cors");

//port
const PORT = process.env.PORT || 5000;

//for req body
app.use(express.json());

// //urlencoded
// app.use(express.urlencoded());

//mongodb connect
connectDB();

///routes
app.use("/api/user", userRoutes);

//authMiddleware
app.use(authMiddleware);

//cross origin access
app.use(cors());

//server
app.listen(PORT, () => {
  console.log(`listning to port ${PORT}`);
});
