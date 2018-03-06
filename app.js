var express = require('express')

var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var mongoose = require('mongoose')
var customer = require('./routes/customer')
var app = express()

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/gizmotic-institute', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/customers', express.static(path.join(__dirname, 'dist')))
app.use('/customer', customer)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.set('view engine', 'html')

module.exports = app
