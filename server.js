var express = require('express');
var app = express();

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.listen(3000, function(){
  console.log('listening on 3000');
});