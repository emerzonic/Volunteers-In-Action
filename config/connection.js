mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "qzkp8ry756433yd4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "r9dq67qi9v7s6ufg",
        password: "ws5khhmguhlojjiw",
        database: "zjxsl7amqbd9fge7"
    });
}

connection.connect();
module.exports = connection;
