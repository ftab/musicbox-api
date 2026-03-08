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
    `SELECT COUNT(*) AS numRows FROM user`
  );
  const data = helper.emptyOrRows(rows);
  const perPage = config.listPerPage;
  const meta = {page, total, perPage};

  return {
    data,
    meta
  }
}

async function getOne(userid){
  const rows = await db.query(
    `SELECT nickname
    FROM user
    WHERE userId = ?`,
    [userid]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getByNickname(nickname){
  const rows = await db.query(
    `SELECT u.userId, COALESCE(a.primaryNick, u.nickname) AS nickname
    FROM user u
    LEFT JOIN aliases a ON u.nickname = a.aliasNick
    WHERE u.nickname = ?
       OR a.aliasNick = ?
       OR a.primaryNick = ?
    LIMIT 1`,
    [nickname, nickname, nickname]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getMultiple,
  getOne,
  getByNickname
}
