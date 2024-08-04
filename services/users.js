const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT userId, nickname
    FROM user ORDER BY userId LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user`,
    [userid]
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
