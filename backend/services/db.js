import mysql from 'mysql2/promise';
import config from '../../config.js';

async function query(sql, params) {
  const connection = await mysql.createConnection({
      ...config.db,
      timezone: 'Z',
  });
  const [results, ] = await connection.query(sql, params);

  connection.end();

  return results;
}

export default {
    query,
};
