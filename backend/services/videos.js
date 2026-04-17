const db = require('./db');
const helper = require('../helper');
const config = require('../../config');

async function getMultiple(userid, page = 1, limit = config.listPerPage, sortBy = 'uservideoId'){
  limit = Number(limit);
  const offset = helper.getOffset(page, limit);
  const orderClause = sortBy === 'lastPlayedTimestamp'
    ? 'ORDER BY lastPlayedTimestamp DESC'
    : 'ORDER BY uservideoId';
  // Resolve all userIds for this user including aliases, then fetch videos for all of them.
  // Ensure no duplicate videos from aliases
  const rows = await db.query(
    `SELECT v.videoId, v.youtubeId, v.soundcloudId, NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl, v.vimeoId, v.bandcampId, v.isFlagged, v.tags, v.title,
    agg.playCount, agg.lastPlayedTimestamp, agg.uservideoId FROM video v
    INNER JOIN (
        SELECT uv.videoId, MAX(uv.uservideoId) AS uservideoId, SUM(uv.playCount) AS playCount, MAX(uv.lastPlayedTimestamp) AS lastPlayedTimestamp
        FROM user_video uv
        INNER JOIN (
            SELECT DISTINCT u.userId FROM user u
            WHERE COALESCE(
                (SELECT primaryNick FROM aliases WHERE aliasNick = u.nickname LIMIT 1),
                u.nickname
            ) = COALESCE(
                (SELECT primaryNick FROM aliases WHERE aliasNick = (SELECT nickname FROM user WHERE userId = ?) LIMIT 1),
                (SELECT nickname FROM user WHERE userId = ?)
            )
        ) fu ON uv.userId = fu.userId
        WHERE uv.hideFromList = 0
        GROUP BY uv.videoId
    ) agg ON v.videoId = agg.videoId
    ${orderClause} LIMIT ?,?`,
    [userid, userid, offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(DISTINCT uv.videoId) AS numRows
    FROM user_video uv
    INNER JOIN (
        SELECT DISTINCT u.userId
        FROM user u
        WHERE COALESCE(
            (SELECT primaryNick FROM aliases WHERE aliasNick = u.nickname LIMIT 1),
            u.nickname
        ) = COALESCE(
            (SELECT primaryNick FROM aliases WHERE aliasNick = (SELECT nickname FROM user WHERE userId = ?) LIMIT 1),
            (SELECT nickname FROM user WHERE userId = ?)
        )
    ) fu ON uv.userId = fu.userId
    WHERE uv.hideFromList = 0`,
    [userid, userid]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page, total, perPage: limit};

  return {
    data,
    meta
  }
}

async function getBroken(page = 1, limit = config.listPerPage) {
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT videoId, youtubeId, soundcloudId, vimeoId, bandcampId, title,
            apiFailures, latestApiSuccess
     FROM video
     WHERE apiFailures > 0
     ORDER BY apiFailures DESC LIMIT ?,?`,
    [offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM video WHERE apiFailures > 0`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, total, perPage: limit };
  return { data, meta };
}

module.exports = {
  getMultiple,
  getBroken
}
