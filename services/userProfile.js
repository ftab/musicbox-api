const db = require('./db');
const helper = require('../helper');

async function getTopArtists(nickname, limit = 10) {
  const rows = await db.query(
    `SELECT a.artistId, a.name, COUNT(DISTINCT va.videoId) AS trackCount
     FROM video_artist va
     INNER JOIN artist a ON va.artistId = a.artistId
     INNER JOIN user_video uv ON va.videoId = uv.videoId
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases al ON u.nickname = al.aliasNick
     WHERE va.role = 'primary'
       AND uv.hideFromList = 0
       AND COALESCE(al.primaryNick, u.nickname) = (
         SELECT COALESCE(a2.primaryNick, u2.nickname)
         FROM user u2
         LEFT JOIN aliases a2 ON u2.nickname = a2.aliasNick
         WHERE u2.nickname = ? OR a2.aliasNick = ? OR a2.primaryNick = ?
         LIMIT 1
       )
     GROUP BY a.artistId, a.name
     ORDER BY trackCount DESC
     LIMIT ?`,
    [nickname, nickname, nickname, limit]
  );
  return helper.emptyOrRows(rows);
}

async function getTopTags(nickname, limit = 10) {
  const rows = await db.query(
    `SELECT v.tags
     FROM video v
     INNER JOIN user_video uv ON v.videoId = uv.videoId
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases al ON u.nickname = al.aliasNick
     WHERE v.tags IS NOT NULL AND v.tags != ''
       AND uv.hideFromList = 0
       AND COALESCE(al.primaryNick, u.nickname) = (
         SELECT COALESCE(a2.primaryNick, u2.nickname)
         FROM user u2
         LEFT JOIN aliases a2 ON u2.nickname = a2.aliasNick
         WHERE u2.nickname = ? OR a2.aliasNick = ? OR a2.primaryNick = ?
         LIMIT 1
       )`,
    [nickname, nickname, nickname]
  );
  // Aggregate tag counts from comma-separated tag strings
  const tagCounts = {};
  for (const row of rows) {
    for (const tag of row.tags.split(', ')) {
      const t = tag.trim().toLowerCase();
      if (t) tagCounts[t] = (tagCounts[t] || 0) + 1;
    }
  }
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

async function getRecentActivity(nickname, limit = 10) {
  const rows = await db.query(
    `SELECT v.videoId, v.title, v.youtubeId, v.soundcloudId,
            NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl,
            v.vimeoId, v.bandcampId,
            uv.lastPlayedTimestamp, uv.playCount
     FROM user_video uv
     INNER JOIN video v ON uv.videoId = v.videoId
     INNER JOIN user u ON uv.userId = u.userId
     LEFT JOIN aliases al ON u.nickname = al.aliasNick
     WHERE uv.hideFromList = 0
       AND COALESCE(al.primaryNick, u.nickname) = (
         SELECT COALESCE(a2.primaryNick, u2.nickname)
         FROM user u2
         LEFT JOIN aliases a2 ON u2.nickname = a2.aliasNick
         WHERE u2.nickname = ? OR a2.aliasNick = ? OR a2.primaryNick = ?
         LIMIT 1
       )
     ORDER BY uv.lastPlayedTimestamp DESC
     LIMIT ?`,
    [nickname, nickname, nickname, limit]
  );
  return helper.emptyOrRows(rows);
}

module.exports = { getTopArtists, getTopTags, getRecentActivity };
