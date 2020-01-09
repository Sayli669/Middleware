var express = require('express')
var app = express()
var mw = require('./my-middleware.js')

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}
//Middleware
app.use(function (req, res, next) {
    console.log(new Date().toString())
    next()
  })
app.use(myLogger)
//Configurable middleware from my-middleware.js
app.use(mw({ option1: '1', option2: '2' }))


app.get('/', function (req, res) {
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText)
  })

//   app.use('/user/:id', function (req, res, next) {
//     console.log('Request Type:', req.get)
//     next()
//   })

//   app.get('/user/:id', function (req, res, next) {
//     res.send('USER')
//   })

// app.get('/user/:id', function (req, res, next) {
//     console.log('ID:', req.params.id)
//     next()
//   }, function (req, res, next) {
//     res.send('User Info')
//   })
  
//   // handler for the /user/:id path, which prints the user ID
//   app.get('/user/:id', function (req, res, next) {
//     res.end(req.params.id)
//   })

// app.get('/user/:id', function (req, res, next) {
//     // if the user ID is 0, skip to the next route
//     if (req.params.id === '0') next('route')
//     // otherwise pass the control to the next middleware function in this stack
//     else next()
//   }, function (req, res, next) {
//     // send a regular response
//     res.send('regular')
//   })
  
//   // handler for the /user/:id path, which sends a special response
//   app.get('/user/:id', function (req, res, next) {
//     res.send('special')
//   })

function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
 
  
  var logStuff = [logOriginalUrl, logMethod]
  app.get('/user/:id', logStuff, function (req, res, next) {
    res.send('User Info')
  })


app.listen(3000)