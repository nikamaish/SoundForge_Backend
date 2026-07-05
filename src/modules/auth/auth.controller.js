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

module.exports = {
  register,
};
