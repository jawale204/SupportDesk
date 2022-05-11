const express = require("express");
const { errorHandler } = require("./middleware/errorHandler/errorHandler");
const app = express();
const dotnet = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("../backend/config/db");

//port
const PORT = process.env.PORT || 5000;

//for req body
app.use(express.json());

//urlencoded
app.use(express.urlencoded());

//mongodb connect
connectDB();

///routes
app.use("/api/user", userRoutes);

//error handler middleware
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`listning to port ${PORT}`);
});
