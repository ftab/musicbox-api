const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRecent(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
            v.title, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId,
            uv.lastPlayedTimestamp
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases a ON LOWER(u.nickname) = LOWER(a.aliasNick)
     INNER JOIN video v ON uv.videoId = v.videoId
     WHERE uv.hideFromList = 0
     ORDER BY uv.lastPlayedTimestamp DESC LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user_video WHERE hideFromList = 0`
  );
  const data = helper.emptyOrRows(rows);
  const perPage = config.listPerPage;
  const meta = { page, total, perPage };
  return { data, meta };
}

module.exports = { getRecent };
