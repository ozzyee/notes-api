import pg from "pg";
import dbconfig from "../config.js";

const pool = new pg.Pool({
  user: dbconfig.user,
  host: dbconfig.dbhost,
  database: dbconfig.db,
  password: dbconfig.password,
  port: dbconfig.dbport,
  ssl: { rejectUnauthorized: false },
});

export default function query(text, params) {
  return pool.query(text, params);
}
