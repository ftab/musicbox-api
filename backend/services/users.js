import db from './db.js';
import helper from '../helper.js';
import config from '../../config.js';

async function getMultiple(page = 1, limit = config.listPerPage) {
  const offset = helper.getOffset(page, limit);
  const rows = await db.query(
    `SELECT userId, nickname
    FROM user ORDER BY userId LIMIT ?,?`,
    [offset, limit]
  );
  const total = await db.query(
    `SELECT COUNT(*) AS numRows FROM user`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page, total, perPage: limit};

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
        WHERE COALESCE(a.primaryNick, u.nickname) = COALESCE(
            (SELECT primaryNick FROM aliases WHERE aliasNick = ? LIMIT 1), ?
        )
        ORDER BY (a.aliasNick IS NULL) DESC
        LIMIT 1`,
        [nickname, nickname]
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

export default {
    getMultiple,
    getOne,
    getByNickname,
};
