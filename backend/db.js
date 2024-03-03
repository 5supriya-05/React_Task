// const pgp = require('pg-promise')();
// const db = pgp('postgres://postgres:root@localhost:5432/mydatabase');

// module.exports = db;







const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customers',
  password: 'root',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
