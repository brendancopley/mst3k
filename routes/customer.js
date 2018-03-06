var express = require('express')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var router = express.Router()
var faker = require('faker')
var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Customer = require('../models/Customer.js')

function validateCustomer (req, res, next) {
  req.checkBody('first_name', 'Invalid first_name').notEmpty()
  req.checkBody('last_name', 'Invalid last_name').notEmpty()
  req.checkBody('email', 'Invalid email').notEmpty()
  var errors = req.validationErrors()
  if (errors) {
    var response = { errors: [] }
    errors.forEach(function (err) {
      response.errors.push(err.msg)
    })
    res.statusCode = 400
    return res.json(response)
  };
  return next()
}

router.get('/generate-fake-data', function (req, res, next) {
  for (var i = 0; i < 90; i++) {
    var customer = new Customer()

    customer.first_name = faker.name.firstName().toLocaleLowerCase()
    customer.last_name = faker.name.lastName().toLocaleLowerCase()
    customer.email = faker.internet.email().toLocaleLowerCase()
    customer.phone = faker.phone.phoneNumber().toLocaleLowerCase()

    Customer.create(customer, function (err, post) {
      if (err) return next(err)
    })
  }
  res.redirect('../#/add-customer')
})

/* GET ALL Customers */
router.get('/', function (req, res, next) {
  Customer.find(function (err, customers) {
    if (err) return next(err)
    res.json(customers)
  })
})

/* GET Customers with Pagination */
router.get('/page/:page', function (req, res, next) {
  var perPage = 15
  var page = req.params.page || 1
  Customer
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, customers) {
      Customer.count().exec(function (err, count) {
        if (err) return next(err)
        res.json({ 'TotalCustomers': count, 'SortedBy': 'created_date', 'TotalPages': Math.ceil(count / perPage), 'CurrentPage': page, 'Customers': customers })
      })
      if (err) return next(err)
    })
})

/* GET Customers by Key, Beginning or End & Pagination */
router.get('/get/:key/:sort/:page', function (req, res, next) {
  var perPage = 15
  var page = req.params.page || 1
  var key = req.params.key || 'created_date'
  var sort = req.params.sort || 'ascending'
  Customer
    .find({})
    .sort({[key]: sort})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, customers) {
      Customer.count().exec(function (err, count) {
        if (err) return next(err)
        res.json({ 'TotalCustomers': count, 'SortedBy': key, 'TotalPages': Math.ceil(count / perPage), 'CurrentPage': page, 'Customers': customers })
      })
      if (err) return next(err)
    })
})

/* GET List of Customers by search */
router.get('/find/:query', function (req, res, next) {
  var perPage = 15
  var re = new RegExp(req.params.query, 'i')
  Customer
    .find()
    .or([
      { 'first_name': { $regex: re } },
      { 'last_name': { $regex: re } },
      { 'email': { $regex: re } },
      { 'phone': { $regex: re } }
    ])
    .exec(function (err, customers) {
      Customer.count().exec(function (err, count) {
        if (err) return next(err)
        res.json({ 'TotalCustomers': count, 'SortedBy': 'created_date', 'TotalPages': Math.ceil(count / perPage), 'CurrentPage': 1, 'Customers': customers })
      })
      if (err) return next(err)
    })
})

/* GET SINGLE Customer BY ID */
router.get('/:id', function (req, res, next) {
  Customer.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* SAVE Customer */
router.post('/', validateCustomer, function (req, res, next) {
  var customer = new Customer()
  console.log(req.body)
  customer.first_name = req.body.first_name.toLocaleLowerCase()
  customer.last_name = req.body.last_name.toLocaleLowerCase()
  customer.email = req.body.email.toLocaleLowerCase()
  if (req.body.phone) customer.phone = req.body.phone.toLocaleLowerCase()

  Customer.create(customer, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* UPDATE Customer */
router.put('/:id', validateCustomer, function (req, res, next) {
  Customer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE Customer */
router.delete('/:id', function (req, res, next) {
  Customer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

module.exports = router
