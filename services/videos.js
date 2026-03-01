const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(userid, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  // Resolve all userIds for this user including aliases, then fetch videos for all of them.
  const rows = await db.query(
    `SELECT uservideoId, videoId, youtubeId, soundcloudId, NULLIF(soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl, vimeoId, bandcampId, isFlagged, tags, title
    FROM video LEFT JOIN user_video USING (videoId)
    WHERE userId IN (
      SELECT u.userId FROM user u
      WHERE COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = LOWER(u.nickname) LIMIT 1),
        u.nickname
      ) = COALESCE(
        (SELECT primaryNick FROM aliases WHERE LOWER(aliasNick) = (SELECT LOWER(nickname) FROM user WHERE userId = ?) LIMIT 1),
        (SELECT nickname FROM user WHERE userId = ?)
      )
    )
    ORDER BY uservideoId LIMIT ?,?`,
    [userid, userid, offset, config.listPerPage]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user_video
    WHERE userId IN (
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
