const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const sql = `SELECT nickname, COUNT(DISTINCT videoId) AS video_count FROM user_video
  INNER JOIN user ON user_video.userId = user.userId GROUP BY user_video.userId
  ORDER BY video_count DESC LIMIT ?,?`;

async function get(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(sql, [offset, config.listPerPage]);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getTop50() {
  const rows = await db.query(sql, ['0', '50']);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

module.exports = {
  get,
  getTop50,
}
