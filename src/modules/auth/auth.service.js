const pool = require("../../config/db");
const bcrypt = require("bcrypt");

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


module.exports = {
  register
}