const db = require('./db');
const helper = require('../helper');

async function getById(artistId) {
  const rows = await db.query(
    `SELECT artistId, name FROM artist WHERE artistId = ?`,
    [artistId]
  );
  return { data: helper.emptyOrRows(rows) };
}

async function getTracks(artistId, page = 1, limit = 50) {
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT v.videoId, v.title, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId, va.role,
            SUM(uv.playCount) AS totalPlays
     FROM video_artist va
     INNER JOIN video v ON va.videoId = v.videoId
     LEFT JOIN user_video uv ON v.videoId = uv.videoId AND uv.hideFromList = 0
     WHERE va.artistId = ? AND v.isFlagged = 0
     GROUP BY v.videoId, v.title, v.youtubeId, v.soundcloudId,
              v.soundcloudUrl, v.vimeoId, v.bandcampId, va.role
     ORDER BY totalPlays DESC
     LIMIT ?, ?`,
    [artistId, offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows
     FROM video_artist va
     INNER JOIN video v ON va.videoId = v.videoId
     WHERE va.artistId = ? AND v.isFlagged = 0`,
    [artistId]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, total, perPage: limit };
  return { data, meta };
}

async function getTopSharers(artistId, limit = 10) {
  const rows = await db.query(
    `SELECT COALESCE(al.primaryNick, u.nickname) AS nickname,
            COUNT(DISTINCT va.videoId) AS trackCount
     FROM video_artist va
     INNER JOIN user_video uv ON va.videoId = uv.videoId
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases al ON u.nickname = al.aliasNick
     WHERE va.artistId = ? AND uv.hideFromList = 0
     GROUP BY COALESCE(al.primaryNick, u.nickname)
     ORDER BY trackCount DESC
     LIMIT ?`,
    [artistId, limit]
  );
  return helper.emptyOrRows(rows);
}

module.exports = { getById, getTracks, getTopSharers };
