const mysql = require('mysql');
const express =require('express');

const app= express();   

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'students'
});
connection.connect();
let list = "SELECT * FROM name"
app.get('/', function (req, res){
    res.sendFile(__dirname+ '/index.html');
    connection.query(list, function(err, results, fields){
        if (err) throw err;
        res.send(results);
    });
});
app.get ('/create', function(req, res){
    res.sendFile(__dirname+'/create.html'); 
})
app.listen(3000, function() {   
    console.log('Listening on port 3000');
 });