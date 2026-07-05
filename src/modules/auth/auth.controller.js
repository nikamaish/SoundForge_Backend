const authService = require("./auth.service");

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
};