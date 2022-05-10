const express = require("express");
const app = express();
const dotnet = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listning to port ${PORT}`);
});

app.use("/api/user", userRoutes);

// app.get("/api/user", (req, res) => {
//   return res.status(201).json({ message: "hello world" });
// });
