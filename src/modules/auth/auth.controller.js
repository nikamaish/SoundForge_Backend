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

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return success(res, user, "Login successful");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
