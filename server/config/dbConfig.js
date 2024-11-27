const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'edge9480',
  database: 'Users',
  connectionLimit: 10,
});

module.exports = db.promise();