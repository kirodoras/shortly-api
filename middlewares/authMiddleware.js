import connection from "../databases/postgres.js";
import { authSignupSchema, authSigninSchema } from "../schemas/authSchema.js";
import { verify } from "../providers/bcryptProvider.js";
import { v4 as uuid } from "uuid";

export function validateSignup(req, res, next) {
  const { error } = authSignupSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  next();
}

export async function checkEmailExists(req, res, next) {
  try {
    const { email } = req.body;
    const { rowCount } = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (rowCount > 0) return res.status(409).send("Email already exists.");
    next();
  } catch (err) {
    res.sendStatus(500);
  }
}

export function validateSignin(req, res, next) {
  const { error } = authSigninSchema.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  next();
}

export async function checkUserMatches(req, res, next) {
  try {
    const { email, password } = req.body;
    const { rows } = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (!rows[0])
      return res.status(401).send("Email or password is incorrect.");
    const isMatch = verify(password, rows[0].password);
    if (!isMatch)
      return res.status(401).send("Email or password is incorrect.");
    res.locals.id = rows[0].id;
    next();
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function checkUserSession(req, res, next) {
  try {
    const { id } = res.locals;
    const { rows } = await connection.query(
      `SELECT * FROM sessions WHERE "userId" = $1`,
      [id]
    );
    if (rows.length > 0) {
      res.locals.token = rows[0].token;
    } else {
      const token = uuid();
      await connection.query(
        `INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,
        [res.locals.id, token]
      );
      res.locals.token = token;
    }
    next();
  } catch (err) {
    res.sendStatus(500);
  }
}
