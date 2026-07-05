const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedData = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || "Validation failed",
      });
    }
  };
};

module.exports = validate;
