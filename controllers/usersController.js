import connection from "../databases/postgres.js";

export async function getUserInfo(req, res) {
  try {
    const { userId } = res.locals;
    const { rows } = await connection.query(
      `SELECT users.id, users.name, SUM("visitCount") as "visitCount", 
        json_agg(
          u.*
        ) as "shortenedUrls"
        FROM users
        LEFT JOIN (
          SELECT urls.id, urls."userId"
          FROM urls
        ) i
        ON i."userId" = users.id
        LEFT JOIN (
          SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
          FROM urls
        ) u
        ON i.id = u.id
        WHERE users.id = $1
        GROUP BY users.id`,
      [userId]
    );
    res.status(200).send(rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}
