const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTop(page = 1, limit = config.listPerPage) {
  limit = Number(limit);
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT v.videoId, v.title, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId,
            SUM(uv.playCount) AS totalPlays
     FROM user_video uv
     INNER JOIN video v ON uv.videoId = v.videoId
     WHERE uv.hideFromList = 0
     GROUP BY v.videoId, v.title, v.youtubeId, v.soundcloudId,
              v.soundcloudUrl, v.vimeoId, v.bandcampId
     ORDER BY totalPlays DESC LIMIT ?,?`,
    [offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(DISTINCT videoId) AS numRows FROM user_video WHERE hideFromList = 0`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, total, perPage: limit };
  return { data, meta };
}

module.exports = { getTop };
