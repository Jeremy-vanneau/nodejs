const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fruits'
});

/*
connection.query('SELECT * FROM "fruits" ', function (error, results, fields) {
    console.log('Résultat de la requête : ' + results);
});*/

connection.beginTransaction(function(err) {
    if (err) {
      connection.end();
      throw err;
    }

    connection.query('INSERT INTO fruits SET name=?', 'banana', function (error, results, fields) {
      if (error) {
        return connection.rollback(function() {
          connection.end();
          throw error;
        });
      }

      connection.query('INSERT INTO fruits SET name=?', 'papaya', function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            connection.end();
            throw error;
          });
        }
        
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              connection.end();
              throw err;
            });
          }
          console.log('Success !');
        });
      });
    });
});

