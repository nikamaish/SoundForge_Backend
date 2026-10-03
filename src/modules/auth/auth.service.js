
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const register = async (data) => {
  const email = data.email.toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  try {
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email,
      passwordHash,
      role: "USER",
    });

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error("Email is already registered");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
};

const login = async (data) => {
  const user = await User.findOne({
    email: data.email.toLowerCase(),
  }).select("+passwordHash");

  if (!user || !user.isActive) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.passwordHash
  );

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "10m",
    }
  );

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const getCurrentUser = async (id) => {
  const user = await User.findById(id);

  if (!user || !user.isActive) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
