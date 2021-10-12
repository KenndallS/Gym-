var mysql      = require('mysql');

var connection = mysql.createConnection({
    database : 'gym',
    host     : 'localhost',
    user     : 'adm-gym',
    password : 'gym2021dbpass'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Database connection success');
});

module.exports = connection;