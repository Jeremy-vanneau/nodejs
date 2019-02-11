const express = require('express');
const app = express();
const fs = require('fs');

app.get('/listChars', function (req, res) {
   fs.readFile( __dirname + '/characters.json', 'utf8', function (err, data) {
      console.log(data);
      res.end(data);
   });
});

app.get('/:id', function (req, res) {
   fs.readFile( __dirname + '/characters.json', 'utf8', function (err, data) {
      let characters = JSON.parse(data);
      let character = characters['char' + req.params.id];
      console.log(character);
      res.end(JSON.stringify(character));
   });
});

app.put('/:id', function (req, res) {
   fs.readFile( __dirname + '/characters.json', 'utf8', function (err, data) {
      let characters = JSON.parse(data);
      let character = characters['char' + req.params.id];
      character.class = 'warrior';
      console.log(character);
      res.end(JSON.stringify(character));
   });
});

app.post('/addChar', function (req, res) {
   fs.readFile( __dirname + '/characters.json', 'utf8', function (err, data) {
      data = JSON.parse(data);
      data['char5'] = {
            "id": 5,
            "name" : "Obi-Wan Kenobi",
            "class" : "jedi"
      };
      console.log(data);
      res.end(JSON.stringify(data));
   });
});

app.delete('/deleteChar', function (req, res) {
   fs.readFile( __dirname + '/characters.json', 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data['char' + 2];
       
      console.log(data);
      res.end( JSON.stringify(data));
   });
});

const server = app.listen(3000, function () {
   console.log('Listening on port 3000');
});