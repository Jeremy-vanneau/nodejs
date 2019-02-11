const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());
app.use(express.static('files'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.post('/file_upload', function (req, res) {

   let uploadedFile = req.files.inputFile;

   if (uploadedFile == undefined) {
      return res.status(400).send('Error 400 : Bad Request - no file !');
   }
   
   let path = __dirname + '/files/' + uploadedFile.name;

   uploadedFile.mv(path, function(err) {
      if (err) return res.status(500).send(err);
      res.send('File ' + uploadedFile.name + ' uploaded !');
   });
});

app.listen(3000, function() {   
   console.log('Listening on port 3000');
});