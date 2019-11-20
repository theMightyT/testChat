const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.uname,
    password: config.pword,
    database: config.database
})

module.exports = connection;