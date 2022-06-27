import query from "../db/index.js";
import { crypt } from "../functions/crypt-data.js";
import { decrypt } from "../functions/decrypt-data.js";

// get users
export async function getAllUses() {
  const getUsers = await query("SELECT * FROM users");
  const data = getUsers.rows;

  return data.map((user) => {
    // decrypt data
    const authid = decrypt(process.env.SALT, user.authid);
    const pin = decrypt(process.env.SALT, user.pin);

    return {
      ...user,
      authid,
      pin,
    };
  });
}

// get user
export async function getUser(id) {
  const getUser = await query("SELECT * FROM users WHERE id = $1", [id]);
  const data = await getUser.rows[0];

  // decrypt data
  const authid = decrypt(process.env.SALT, data.authid);
  const pin = decrypt(process.env.SALT, data.pin);

  return {
    ...data,
    authid,
    pin,
  };
}

// create user
export async function addUser(data) {
  const { email, firstName, lastName, authId, pin } = data;
  const authIdCrypt = crypt(process.env.SALT, authId);
  const pinCrypt = crypt(process.env.SALT, pin);

  const newUser = await query(
    `INSERT INTO users (email, firstName, lastName, authId, pin ) VALUES($1, $2, $3, $4, $5) RETURNING id, email, firstName, lastName, authId, pin `,
    [email, firstName, lastName, authIdCrypt, pinCrypt]
  );

  return newUser.rows;
}

// update user
export async function updateUser(id, data) {
  const { email, firstName, lastName, authId, pin } = data;
  const authIdCrypt = crypt(process.env.SALT, authId);
  const pinCrypt = crypt(process.env.SALT, pin);

  const updateUser = await query(
    `UPDATE users SET email=$1 ,firstName=$2, lastName=$3, authId=$4, pin=$5 WHERE id=$6 RETURNING id, email, firstName, lastName, authId, pin `,
    [email, firstName, lastName, authIdCrypt, pinCrypt, id]
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
    const authIdCrypt = crypt(process.env.SALT, authId);
    await query(
      `UPDATE users SET authId=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [authIdCrypt, id]
    );
  }

  if (pin) {
    const pinCrypt = crypt(process.env.SALT, pin);
    await query(
      `UPDATE users SET pin=$1  WHERE id=$2 RETURNING email, firstName, lastName, authId, pin `,
      [pinCrypt, id]
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
