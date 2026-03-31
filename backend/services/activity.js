const db = require('./db');
const helper = require('../helper');
const config = require('../../config');

async function getRecent(page = 1, limit = config.listPerPage) {
  limit = Number(limit);
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
            v.videoId, v.title, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId, v.isFlagged,
            uv.lastPlayedTimestamp
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases a ON u.nickname = a.aliasNick
     INNER JOIN video v ON uv.videoId = v.videoId
     WHERE uv.hideFromList = 0
     ORDER BY uv.lastPlayedTimestamp DESC LIMIT ?,?`,
    [offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user_video WHERE hideFromList = 0`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, total, perPage: limit };
  return { data, meta };
}

module.exports = { getRecent };
