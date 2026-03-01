const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRankings(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
            SUM(uv.playCount) AS pp_score
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases a ON LOWER(u.nickname) = LOWER(a.aliasNick)
     WHERE uv.hideFromList = 0
     GROUP BY COALESCE(a.primaryNick, u.nickname)
     ORDER BY pp_score DESC LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return { data, meta };
}

module.exports = { getRankings };
