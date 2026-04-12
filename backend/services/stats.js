const db = require('./db');

async function get() {
    const result = await db.query(`
        SELECT COUNT(*) AS total_songs,
        COUNT(youtubeId) AS youtube_songs,
        COUNT(soundcloudId) AS soundcloud_songs,
        COUNT(bandcampId) AS bandcamp_songs,
        COUNT(vimeoId) AS vimeo_songs,
        CAST(SUM(isFlagged = 1) AS UNSIGNED) AS flagged_songs,
        (SELECT COUNT(*) FROM artist) AS total_artists,
        (SELECT COUNT(*) FROM user) AS total_users
        FROM video
    `);

    return result[0];
}

module.exports = { get };
