const db = require('./db');
const helper = require('../helper');
const config = require('../../config');

const sql = `SELECT COALESCE(a.primaryNick, u.nickname) AS nickname,
  COUNT(DISTINCT uv.videoId) AS video_count
  FROM user_video uv
  INNER JOIN user u ON uv.userId = u.userId
  LEFT JOIN aliases a ON u.nickname = a.aliasNick
  GROUP BY COALESCE(a.primaryNick, u.nickname)
  ORDER BY video_count DESC LIMIT ?,?`;

async function get(page = 1, limit = config.listPerPage){
  const  offset = helper.getOffset(page, limit);
  const rows = await db.query(sql, [offset, limit]);
  const data = helper.emptyOrRows(rows);
  const total = await db.query(`
    SELECT COUNT(*) AS numRows
    FROM (
      SELECT COALESCE(a.primaryNick, u.nickname) AS nickname
      FROM user_video uv
      INNER JOIN user u ON uv.userId = u.userId
      LEFT JOIN aliases a ON u.nickname = a.aliasNick
      GROUP BY COALESCE(a.primaryNick, u.nickname)
    ) AS grouped
  `);
  const meta = {page, total, perPage: limit};
  return {
    data,
    meta
  }
}

module.exports = {
  get,
}
