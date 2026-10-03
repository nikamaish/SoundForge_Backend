
const { z } = require("zod");

const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  password: z.string().min(1).max(72),
});

module.exports = {
  registerSchema,
  loginSchema,
};
