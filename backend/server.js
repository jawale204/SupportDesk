const express = require("express");
const { errorHandler } = require("./middleware/errorHandler/errorHandler");
const app = express();
const dotnet = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

//port
const PORT = process.env.PORT || 5000;

//for req body
app.use(express.json());

//server
app.listen(PORT, () => {
  console.log(`listning to port ${PORT}`);
});

///routes
app.use("/api/user", userRoutes);

//error handler middleware
app.use(errorHandler);
