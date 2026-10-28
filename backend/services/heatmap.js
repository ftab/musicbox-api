import db from './db.js';
import helper from '../helper.js';

async function get(userid, timezone = 'UTC', days = 365) {
    days = Number(days);

    const rows = await db.query(
        `SELECT DISTINCT uv.videoId, uv.lastPlayedTimestamp AS playedAt
        FROM user_video uv
        INNER JOIN (
            SELECT DISTINCT u.userId
            FROM user u
            WHERE COALESCE(
                (SELECT primaryNick FROM aliases WHERE aliasNick = u.nickname LIMIT 1),
                u.nickname
            ) = COALESCE(
                (SELECT primaryNick FROM aliases WHERE aliasNick = (SELECT nickname FROM user WHERE userId = ?) LIMIT 1),
                (SELECT nickname FROM user WHERE userId = ?)
            )
        ) fu ON uv.userId = fu.userId
        WHERE uv.lastPlayedTimestamp IS NOT NULL
        AND uv.lastPlayedTimestamp >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL ? DAY)
        ORDER BY playedAt`,
        [userid, userid, days + 1]
    );

    const perDay = new Map();

    for(const row of helper.emptyOrRows(rows)) {
        const day = new Date(row.playedAt).toLocaleDateString('sv', { timeZone: timezone });

        if( ! perDay.has(day)) {
            perDay.set(day, new Set());
        }

        perDay.get(day).add(row.videoId);
    }

    return [...perDay].map(([date, set]) => ({ date, count: set.size }));
}

export default {
    get,
};
