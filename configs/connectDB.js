// ../configs/connectDB.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'demo',
    password: ''
})

module.exports = pool;
