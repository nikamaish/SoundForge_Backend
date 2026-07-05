const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (data) => {
  const existingUser = await pool.query("SELECT * FROM users WHERE email=$1", [
    data.email,
  ]);

  if (existingUser.rows.length) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(data.password, 10);

  const result = await pool.query(
    `
    INSERT INTO users
    (
        first_name,
        last_name,
        email,
        password_hash,
        role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, email, role
    `,
    [data.firstName, data.lastName, data.email, hash, data.role],
  );
  //INSERT only inserts the record. RETURNING allows us to immediately get the inserted row back without running another SELECT query.
  return result.rows[0];
};

const login = async (data) => {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [data.email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = {
  register,
  login,
};
