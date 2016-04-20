#!/usr/bin/env node

var express = require('express')
var logger = require('morgan')
var app = express()
var path = require('path')
var favicon = require('serve-favicon')
app.use(logger('dev'))
app.use(express.static('public'))
var http = require('http')
var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)
var server = http.createServer(app)
server.listen(port)

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var mailgun = require('mailgun-js')({apiKey: 'key-a0322b3bd52da691b2cca7d45be0c76b', domain: 'mg.aubrey-ford.com'})

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

app.get('/download', function(req, res){
  var file = __dirname + '/public/aubrey-ford-resume.pdf'
  res.download(file)
})

app.post('/mail', function(req,res){

  var data = {
    from: req.body.email,
    to: 'musicaubrey@gmail.com',
    subject: 'RESPOND WITHIN 24 HOURS!',
    text: req.body.name +"  "+ req.body.phone +"  "+ req.body.email + "\n" + req.body.message
  }

  mailgun.messages().send(data, function (error, body) {
    console.log(body)
  })

  setTimeout(function(){
    res.redirect('/')
  },700)

})
