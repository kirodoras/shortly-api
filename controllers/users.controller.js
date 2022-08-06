import connection from "../databases/postgres.js";

export async function getUserInfo(req, res) {
  try {
    const { userId } = res.locals;
    const { rows: user } = await connection.query(
      `SELECT users.id, users.name
        FROM users
        WHERE users.id = $1`,
      [userId]
    );
    const { rows: info } = await connection.query(
      `SELECT SUM("visitCount") as "visitCount", 
        json_agg(
            u.*
        ) as "shortenedUrls"
        FROM users
        JOIN (
            SELECT urls.id, urls."userId"
            FROM urls
        ) i
        ON i."userId" = users.id
        JOIN (
            SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
            FROM urls
        ) u
        ON i.id = u.id
        WHERE users.id = $1
        GROUP BY users.id`,
      [userId]
    );
    const response = { ...user[0], ...info[0] };
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.sendStatus(500);
  }
}
