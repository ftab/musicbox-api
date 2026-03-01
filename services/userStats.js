const db = require('./db');
const helper = require('../helper');

async function getStats(nickname) {
  const rows = await db.query(
    `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
            SUM(uv.playCount)           AS totalPlays,
            COUNT(DISTINCT uv.videoId)  AS uniqueVideos,
            MIN(uv.lastPlayedTimestamp) AS firstShared,
            MAX(uv.lastPlayedTimestamp) AS mostRecentPlayed
     FROM user u
     LEFT JOIN aliases a ON LOWER(u.nickname) = LOWER(a.aliasNick)
     INNER JOIN user_video uv ON u.userId = uv.userId
     WHERE uv.hideFromList = 0
       AND COALESCE(a.primaryNick, u.nickname) = (
         SELECT COALESCE(a2.primaryNick, u2.nickname)
         FROM user u2
         LEFT JOIN aliases a2 ON LOWER(u2.nickname) = LOWER(a2.aliasNick)
         WHERE LOWER(u2.nickname) = LOWER(?)
            OR LOWER(a2.aliasNick) = LOWER(?)
            OR LOWER(a2.primaryNick) = LOWER(?)
         LIMIT 1
       )
     GROUP BY COALESCE(a.primaryNick, u.nickname)`,
    [nickname, nickname, nickname]
  );
  return { data: helper.emptyOrRows(rows) };
}

module.exports = { getStats };
