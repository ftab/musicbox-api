const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(userid, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  // Resolve all userIds for this user including aliases, then fetch videos for all of them.
  const rows = await db.query(
    `SELECT uv.uservideoId, v.videoId, v.youtubeId, v.soundcloudId, NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl, v.vimeoId, v.bandcampId, v.isFlagged, v.tags, v.title, uv.playCount, uv.lastPlayedTimestamp
    FROM video v INNER JOIN user_video uv USING (videoId)
    WHERE uv.hideFromList = 0 AND uv.userId IN (
      SELECT u.userId FROM user u
      WHERE COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = LOWER(u.nickname) LIMIT 1),
        u.nickname
      ) = COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = (SELECT LOWER(nickname) FROM user WHERE userId = ?) LIMIT 1),
        (SELECT nickname FROM user WHERE userId = ?)
      )
    )
    ORDER BY uv.uservideoId LIMIT ?,?`,
    [userid, userid, offset, config.listPerPage]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user_video
    WHERE hideFromList = 0 AND userId IN (
      SELECT u.userId FROM user u
      WHERE COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = LOWER(u.nickname) LIMIT 1),
        u.nickname
      ) = COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = (SELECT LOWER(nickname) FROM user WHERE userId = ?) LIMIT 1),
        (SELECT nickname FROM user WHERE userId = ?)
      )
    )`,
    [userid, userid]
  );
  const data = helper.emptyOrRows(rows);
  const perPage = config.listPerPage;
  const meta = {page, total, perPage};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}
