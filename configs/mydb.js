const mysql = require("mysql2");

const mydb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node_auth_db",
});

mydb.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = mydb;
