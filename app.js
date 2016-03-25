#!/usr/bin/env node

var express = require('express');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));
app.use(express.static('public'));
var http = require('http');
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

app.get('/download', function(req, res){
  var file = __dirname + '/public/aubrey-ford-resume.pdf';
  res.download(file);
});
