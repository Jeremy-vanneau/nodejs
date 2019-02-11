const express = require('express');
const app = express();

const pug = require('pug')

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static('assets'))

app.get('/', function (req, res) {
    res.render('index', { title: '<i>Hey</i>', name: 'Obi Wan Kenobi', message: 'Hello there!', imgSrc: 'hello.gif'});
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});