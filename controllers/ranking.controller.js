import connection from "../databases/postgres.js";

export async function rankingByVisitCount(req, res) {
  try {
    const { rows } = await connection.query(
      `SELECT users.id, users.name, COUNT(urls) as "linksCount", SUM(urls."visitCount") as "visitCount"
        FROM users
        LEFT JOIN urls
        ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC NULLS LAST
        LIMIT 10`
    );
    res.status(200).send(rows);
  } catch (error) {
    res.sendStatus(500);
  }
}
