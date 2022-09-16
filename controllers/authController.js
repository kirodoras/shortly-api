import connection from "../databases/postgres.js";
import { encode, verify } from "../providers/bcryptProvider.js";

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

export async function signin(req, res) {
  try {
    res.status(200).send(res.locals.token);
  } catch (err) {
    res.sendStatus(500);
  }
}
