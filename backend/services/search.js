const db = require('./db');
const helper = require('../helper');

async function videos(searchTerm = null) {
    const rows = await db.query(
        `SELECT v.videoId, v.youtubeId, v.soundcloudId,
        NULLIF(v.soundcloudUrl, 'NOT_FOUND') AS soundcloudUrl, v.vimeoId, v.bandcampId, v.title, v.isFlagged,
        GROUP_CONCAT(DISTINCT COALESCE(al.primaryNick, u.nickname) ORDER BY uv.playCount DESC SEPARATOR ', ') AS nicknames
        FROM video v
        INNER JOIN user_video uv USING (videoId)
        INNER JOIN user u USING (userId)
        LEFT JOIN aliases al ON u.nickname = al.aliasNick
        WHERE MATCH(v.title) AGAINST(? IN BOOLEAN MODE)
        GROUP BY v.videoId
        ORDER BY v.title ASC`,
        [`"${searchTerm}"`]
    );
    const data = helper.emptyOrRows(rows);
    return { data };
};

module.exports = { videos };
