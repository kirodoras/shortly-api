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

export async function getShortenById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await connection.query(
      `SELECT * FROM urls WHERE id = $1`,
      [id]
    );
    if (!rows[0]) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send({
      id: rows[0].id,
      shortUrl: rows[0].shortUrl,
      url: rows[0].url,
    });
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function redirectToUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const { rows } = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    if (!rows[0]) {
      res.sendStatus(404);
      return
    }
    await connection.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    res.redirect(rows[0].url);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function deleteShortenById(req, res) {
  try {
    const { id } = req.params;
    await connection.query(
      `DELETE FROM urls WHERE id = $1`,
      [id]
    );
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}
