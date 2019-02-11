const express = require('express')
const app = express()
const helmet = require('helmet')

app.use(helmet());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000')
})
