import query from "../db/index.js";

// get users
export async function getAllUses() {
  const getUsers = await query("SELECT * FROM users");
  return getUsers.rows;
}

// get user
export async function getUser(id) {
  const getUser = await query("SELECT * FROM users WHERE id = $1", [id]);
  return getUser.rows;
}

// create user
export async function addUser(data) {
  const { email, firstName, lastName, authId, pin } = data;

  const newUser = await query(
    `INSERT INTO users (email, firstName, lastName, authId, pin ) VALUES($1, $2, $3, $4, $5) RETURNING email, firstName, lastName, authId, pin `,
    [email, firstName, lastName, authId, pin]
  );

  return newUser.rows;
}

// update user
export async function updateUser(id, data) {
  const { email, firstName, lastName, authId, pin } = data;

  const updateUser = await query(
    `UPDATE users SET email=$1 ,firstName=$2, lastName=$3, authId=$4, pin=$5 WHERE id=$6 RETURNING email, firstName, lastName, authId, pin `,
    [email, firstName, lastName, authId, pin, id]
  );

  return updateUser.rows;
}

// patch user
export async function patchUser(data, id) {
  const { email, firstName, lastName, authId, pin } = data;

  if (email) {
    await query(
      `UPDATE users SET email=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [email, id]
    );
  }

  if (firstName) {
    await query(
      `UPDATE users SET firstName=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [firstName, id]
    );
  }

  if (lastName) {
    await query(
      `UPDATE users SET lastName=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [lastName, id]
    );
  }

  if (authId) {
    await query(
      `UPDATE users SET authId=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [authId, id]
    );
  }

  if (pin) {
    await query(
      `UPDATE users SET pin=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [pin, id]
    );
  }

  const userData = await query("SELECT * FROM users WHERE id = $1", [id]);
  return userData.rows;
}

// delete use
export async function deleteUser(id) {
  const selectedUser = await query(`DELETE FROM users WHERE id = $1`, [id]);
  return selectedUser.rows;
}