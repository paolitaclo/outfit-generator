var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(3000, function() {
  console.log('Outfit Generator listening on: 3000!');
});
