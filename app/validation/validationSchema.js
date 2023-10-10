const Joi = require('joi')

// validation schema for login
const loginSchema = Joi.object({
  username: Joi.string().required()
    .messages({
      'string.base': 'username should be a valid string.',
      'any.required': 'username is required.'
    }),
  password: Joi.string().min(6).max(10).required()
    .messages({
      'string.base': 'Password should be a valid string.',
      'string.min': 'Password must be at least 6 characters long.',
      'string.max': 'Password cannot be longer than 10 characters',
      'any.required': 'Password is required.'
    })
})

const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(20).required()
    .messages({
      'string.base': 'name should be a valid string.',
      'string.min': 'name must be at least 2 characters long.',
      'string.max': 'name cannot be longer than 20 characters',
      'any.required': 'name is required.'
    }),
  salary: Joi.number().min(0).required()
    .messages({
      'string.min': 'salary must be greater than 0.'
    }),
  currency: Joi.string().default('USD')
    .messages({
      'string.base': 'Currency should be a valid string.'
    }),
  department: Joi.string().required()
    .messages({
      'string.base': 'department should be a valid string.'
    }),
  sub_department: Joi.string().required()
    .messages({
      'string.base': 'sub_department should be a valid string.'
    }),
  on_contract: Joi.boolean()
})

const deleteEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(20).required()
    .messages({
      'string.base': 'name should be a valid string.',
      'string.min': 'name must be at least 2 characters long.',
      'string.max': 'name cannot be longer than 20 characters',
      'any.required': 'name is required.'
    })
})

module.exports = {
  loginSchema, employeeSchema, deleteEmployeeSchema
}
