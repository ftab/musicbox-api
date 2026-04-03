const db = require('./db');
const helper = require('../helper');

async function getById(videoId) {
  const rows = await db.query(
    `SELECT v.videoId, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId, v.isFlagged, v.title, v.tags,
            v.youtubeChannelName
     FROM video v
     WHERE v.videoId = ?`,
    [videoId]
  );
  return { data: helper.emptyOrRows(rows) };
}

async function getArtists(videoId) {
  const rows = await db.query(
    `SELECT a.artistId, a.name, va.role
     FROM video_artist va
     INNER JOIN artist a ON va.artistId = a.artistId
     WHERE va.videoId = ?
     ORDER BY FIELD(va.role, 'primary', 'featured', 'remixer'), a.name`,
    [videoId]
  );
  return helper.emptyOrRows(rows);
}

async function getSharedBy(videoId) {
  const rows = await db.query(
    `SELECT COALESCE(al.primaryNick, u.nickname) AS nickname,
            uv.playCount, uv.lastPlayedTimestamp
     FROM user_video uv
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases al ON u.nickname = al.aliasNick
     WHERE uv.videoId = ? AND uv.hideFromList = 0
     ORDER BY uv.playCount DESC`,
    [videoId]
  );
  return helper.emptyOrRows(rows);
}

async function getOtherTracksByArtists(videoId, artistIds, limit = 10) {
  if (!artistIds || artistIds.length === 0) return [];
  const placeholders = artistIds.map(() => '?').join(',');
  const rows = await db.query(
    `SELECT DISTINCT v.videoId, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId, v.title,
            a.name AS artistName
     FROM video_artist va
     INNER JOIN video v ON va.videoId = v.videoId
     INNER JOIN artist a ON va.artistId = a.artistId
     WHERE va.artistId IN (${placeholders})
       AND va.videoId != ?
       AND v.isFlagged = 0
       AND va.role = 'primary'
     ORDER BY RAND()
     LIMIT ?`,
    [...artistIds, videoId, limit]
  );
  return helper.emptyOrRows(rows);
}

module.exports = { getById, getArtists, getSharedBy, getOtherTracksByArtists };
