import query from "../index.js";

async function createUsersTable() {
  const res = await query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    firstName TEXT,
    lastName TEXT,
    authId TEXT,
    pin TEXT
)`);
  console.log("Created users table: ", res);
}

createUsersTable();
