const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(userid, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT uservideoId, videoId, youtubeId, soundcloudId, vimeoId, bandcampId, isFlagged, tags, title
    FROM video LEFT JOIN user_video USING (videoId)
    WHERE userId = ?
    ORDER BY uservideoId LIMIT ?,?`,
    [userid, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}
