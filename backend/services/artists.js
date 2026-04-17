const db = require('./db');
const helper = require('../helper');
const config = require('../../config');

async function get(page = 1, limit = config.listPerPage, filter = null) {
    let rows, total;
    const offset = helper.getOffset(page, limit);

    let sql = `
        SELECT a.*, COUNT(va.videoId) as video_count FROM artist a
        LEFT JOIN video_artist va ON a.artistId = va.artistId
    `;

    if(filter && filter === '_') {
        rows = await db.query(`
            ${sql}
            WHERE SUBSTR(a.name, 1, 1) NOT BETWEEN 'A' AND 'Z'
            GROUP BY a.artistId
            ORDER BY a.name ASC LIMIT ?,?`,
            [offset, limit]
        );
        total = await db.query(`
            SELECT COUNT(*) AS numRows FROM artist
            WHERE name NOT BETWEEN 'A' AND 'Z'`
        );
    } else if(filter) {
        rows = await db.query(`
            ${sql}
            WHERE a.name LIKE ?
            GROUP BY a.artistId
            ORDER BY a.name ASC LIMIT ?,?`,
            [`${filter}%`, offset, limit]
        );
        total = await db.query(`
            SELECT COUNT(*) AS numRows FROM artist WHERE name LIKE ?`,
            [`${filter}%`]
        );
    } else {
        rows = await db.query(`
            ${sql}
            GROUP BY a.artistId
            ORDER BY name ASC LIMIT ?,?`,
            [offset, limit]
        );
        total = await db.query(`SELECT COUNT(*) AS numRows FROM artist`);
    }

    const data = helper.emptyOrRows(rows);
    const meta = { page, total, perPage: limit };
    return { data, meta };
}

module.exports = { get };
