var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var validate = require('mongoose-validator')

var CustomerSchema = new mongoose.Schema({
  first_name: { type: String, lowercase: true, trim: true, index: true, required: true },
  last_name: { type: String, lowercase: true, index: true, required: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    validate: [validate({
      validator: 'isEmail',
      message: 'Not a valid email.'
    })]
  },
  phone: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true
  },
  created_date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Customer', CustomerSchema)
