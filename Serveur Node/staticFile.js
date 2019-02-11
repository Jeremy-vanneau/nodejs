const express = require('express');
const app = express();

app.use(express.static('myfiles'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(3000, function () {
   console.log("App listening at 3000")
})