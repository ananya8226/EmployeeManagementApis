const { login, verifyAuthToken } = require('../controller/auth')
const { addEmployee, deleteEmployee, entireSalarySummary, onContractSummary, departmentSummary, subDepartmentSummary } = require('../controller/user')
const reqValidator = require('../validation/validate')
const { employeeSchema, loginSchema, deleteEmployeeSchema } = require('../validation/validationSchema')

const router = require('express').Router()

router.patch('/login', reqValidator(loginSchema, 'body'), login)
router.post('/add-employee', verifyAuthToken, reqValidator(employeeSchema, 'body'), addEmployee)
router.delete('/delete-employee/:name', verifyAuthToken, reqValidator(deleteEmployeeSchema, 'params'), deleteEmployee)
router.get('/entire-salary-summary', verifyAuthToken, entireSalarySummary)
router.get('/on-contract-salary-summary', verifyAuthToken, onContractSummary)
router.get('/department-wise-summary', verifyAuthToken, departmentSummary)
router.get('/subdepartment-wise-summary', verifyAuthToken, subDepartmentSummary)

module.exports = router
