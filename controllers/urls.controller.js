import connection from "../databases/postgres.js";
import { nanoid } from "nanoid";

export async function shorten(req, res) {
  try {
    const { url } = req.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid(6);
    await connection.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3)`,
      [userId, shortUrl, url]
    );
    res.status(200).send({
      shortUrl,
    });
  } catch (err) {
    res.sendStatus(500);
  }
}
