const express = require("express");
const app = express();
const path = require("path");
const dotnet = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
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

//user routes
app.use("/api/user", userRoutes);

//ticket routes
app.use("/api/tickets", ticketRoutes);
//authMiddleware
app.use(authMiddleware);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/public/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

//cross origin access
app.use(cors());

//server
app.listen(PORT, () => {
  console.log(`listning to port ${PORT}`);
});
