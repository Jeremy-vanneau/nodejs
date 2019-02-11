const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'students'
});
connection.connect();

let sql = "INSERT INTO name (name) VALUES ('Company Inc')";
let sqlup  = "UPDATE name SET name='jean'";
let sqldel = "DELETE FROM `name` WHERE `name`='jean'";
let sqlrd = "SELECT * FROM name"

connection.query(sql, function (err, results, fields) {
    if (err) throw err;
    console.log("Compagny Inc : Ajouter");
});
connection.query(sqlrd, function(err, results, fields){
    if (err) throw err;
    console.log('read');
})
connection.query(sqlup, function(err, results, fields){
    if (err) throw err;
    console.log('Company Inc = jean');
});
connection.query(sqldel, function(err, results, fields){
    if (err) throw err;
    console.log('jean : supprimer')
});
connection.end();