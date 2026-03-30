const db = require('./db');

async function getTotalSongs() {
    const result = await db.query(`SELECT COUNT(*) as count FROM video`);
    return { data: result[0]['count'] };
}

module.exports = { getTotalSongs };
