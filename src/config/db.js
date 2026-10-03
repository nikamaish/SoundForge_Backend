const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// here why await and async is used because mongoose.connect returns a promise, and we want to wait for the connection to be established before proceeding. The async function allows us to use await, which pauses the execution of the function until the promise is resolved or rejected. This ensures that we handle the connection properly and catch any errors that may occur during the connection process.