const { z } = require("zod");

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
