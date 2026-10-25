import db from './db.js';
import helper from '../helper.js';

async function get(userid, days = 365){
    days = Number(days);

    const rows = await db.query(
        `SELECT DATE_FORMAT(uv.lastPlayedTimestamp, '%Y-%m-%d') AS date,
        COUNT(DISTINCT uv.videoId) AS count
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
        WHERE uv.hideFromList = 0
        AND uv.lastPlayedTimestamp IS NOT NULL
        AND uv.lastPlayedTimestamp >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY date
        ORDER BY date`,
        [userid, userid, days]
    );

    return helper.emptyOrRows(rows)
        .map(row => ({
            date: row.date,
            count: Number(row.count)
        }));
}

export default {
    get,
};
