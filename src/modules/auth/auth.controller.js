const authService = require("./auth.service");
const { success } = require("../../common/utils/apiResponse");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    return success(res, user, "User registered successfully", 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    res.cookie("accessToken", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return success(res, data.user, "Login successful");
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");

  return success(res, null, "Logged out successfully");
};

module.exports = {
  register,
  login,
  logout,
};

module.exports = {
  register,
  login,
};
