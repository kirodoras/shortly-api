import connection from "../databases/postgres.js";
import { encode } from "../providers/bcrypt.provider.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const hash = await encode(password);
    await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hash]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}
