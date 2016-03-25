var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));

app.use(express.static('public'));

app.get('/*', function(req, res, next){
 var options = {root: __dirname + "/public"};

 res.sendFile('index.html', options, function(err){
   if(err) return next(err);
 })
});

app.listen(3000, function(){
 console.log('app listening on port 3000');
});
