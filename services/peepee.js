const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRankings(page = 1, limit = config.listPerPage) {
  limit = Number(limit);
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
            SUM(uv.playCount) AS pp_score
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases a ON u.nickname = a.aliasNick
     WHERE uv.hideFromList = 0
     GROUP BY COALESCE(a.primaryNick, u.nickname)
     ORDER BY pp_score DESC LIMIT ?,?`,
    [offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(DISTINCT COALESCE(a.primaryNick, u.nickname)) AS numRows
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases a ON u.nickname = a.aliasNick
     WHERE uv.hideFromList = 0`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, total, perPage: limit };
  return { data, meta };
}

module.exports = { getRankings };
