import connection from "../databases/postgres.js";
import { authSignupSchema } from "../schemas/auth.schema.js";

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
