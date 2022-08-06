import connection from "../databases/postgres.js";
import { tokenSchema } from "../schemas/token.schema.js";

export async function requireToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authorization?.replace("Bearer ", "").trim();
  const validationToken = tokenSchema.validate(token);
  if (validationToken.error) {
    return res.sendStatus(401);
  }
  const { rows } = await connection.query(
    `SELECT * FROM sessions WHERE token = $1`,
    [token]
  );
  if (rows.length === 0) {
    return res.sendStatus(404);
  }
  res.locals.userId = rows[0].userId;
  res.locals.token = token;
  next();
}
