
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./common/middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  return res.status(connected ? 200 : 503).json({
    success: connected,
    message: connected
      ? "SoundForge API and MongoDB are running"
      : "MongoDB is not connected",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});

module.exports = app;
