
const authService = require("./auth.service");
const { success } = require("../../common/utils/apiResponse");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    return success(res, user, "Registration successful", 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    res.cookie("accessToken", data.token, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });

    return success(res, data.user, "Login successful");
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken", cookieOptions);

  return success(res, null, "Logout successful");
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    return success(res, user, "User fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  me,
};
