import connection from "../databases/postgres.js";
import { urlSchema } from "../schemas/urlsSchema.js";

export async function validateUrl(req, res, next) {
  const { url } = req.body;
  const validationUrl = urlSchema.validate(url);

  if (validationUrl.error) {
    res.sendStatus(422);
    return;
  }

  next();
}

export async function checkUserOwnerUrl(req, res, next) {
  const { id } = req.params;
  const userId = res.locals.userId;

  const { rows } = await connection.query(`SELECT * FROM urls WHERE id = $1`, [
    id,
  ]);

  if (!rows[0]) {
    res.sendStatus(404);
    return;
  }

  if (rows[0].userId !== userId) {
    res.sendStatus(401);
    return;
  }

  next();
}
