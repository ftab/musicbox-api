const db = require('./db');
const helper = require('../helper');
const config = require('../../config');

async function get(page = 1, limit = config.listPerPage) {
    const offset = helper.getOffset(page, limit);
    const rows = await db.query(`
        SELECT * FROM artist ORDER BY name ASC LIMIT ?,?`,
        [offset, limit]
    );
    const total = await db.query(`SELECT COUNT(*) AS numRows FROM artist`);
    const data = helper.emptyOrRows(rows);
    const meta = { page, total, perPage: limit };
    return { data, meta };
}

module.exports = { get };
