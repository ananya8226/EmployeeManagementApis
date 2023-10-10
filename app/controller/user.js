const { successResponse, failureResponse } = require('../response/response')
const httpStatus = require('http-status')

const employee = [
  {
    name: 'Abhishek',
    salary: 145000,
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform'
  },
  {
    name: 'Anurag',
    salary: 90000,
    currency: 'USD',
    department: 'Banking',
    on_contract: true,
    sub_department: 'Loan'
  },
  {
    name: 'Himani',
    salary: 240000,
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform'
  },
  {
    name: 'Yatendra',
    salary: 30,
    currency: 'USD',
    department: 'Operations',
    sub_department: 'CustomerOnboarding'
  },
  {
    name: 'Ragini',
    salary: 30,
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform'
  },
  {
    name: 'Nikhil',
    salary: 110000,
    currency: 'USD',
    on_contract: true,
    department: 'Engineering',
    sub_department: 'Platform'
  },
  {
    name: 'Guljit',
    salary: 30,
    currency: 'USD',
    department: 'Administration',
    sub_department: 'Agriculture'
  },
  {
    name: 'Himanshu',
    salary: 70000,
    currency: 'EUR',
    department: 'Operations',
    sub_department: 'CustomerOnboarding'
  },
  {
    name: 'Anupam',
    salary: 200000000,
    currency: 'INR',
    department: 'Engineering',
    sub_department: 'Platform'
  }
]

const exchangeRates = {
  USD: 1,
  EUR: 1.18,
  INR: 0.014
}

function convertToUSD (salary, currency) {
  if (exchangeRates[currency]) {
    return salary * exchangeRates[currency]
  } else {
    return salary
  }
}

exports.addEmployee = async (req, res) => {
  try {
    const data = req.body
    employee.push(data)
    return successResponse(res, httpStatus.OK, data, 'Employee added successfully')
  } catch (error) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR')
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const { name } = req.params
    const index = employee.findIndex(record => record.name === name)
    if (index !== -1) {
      employee.splice(index, 1)
      return successResponse(res, httpStatus.NO_CONTENT, 'Employee deleted')
    } else {
      return failureResponse(res, httpStatus.NOT_FOUND, 'Employee not found')
    }
  } catch (error) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR')
  }
}

exports.summaryStats = (employeeData) => {
  if (employeeData.length === 0) {
    return { min: 0, max: 0, mean: 0 }
  }

  let sum = 0
  let min = Infinity
  let max = -Infinity

  for (const emp of employeeData) {
    const salaryUSD = convertToUSD(emp.salary, emp.currency)
    sum += salaryUSD
    if (salaryUSD < min) min = salaryUSD
    if (salaryUSD > max) max = salaryUSD
  }
  const mean = sum / employeeData.length
  return { min, max, mean }
}

exports.entireSalarySummary = async (req, res) => {
  try {
    const data = this.summaryStats(employee)
    return successResponse(res, httpStatus.OK, data, 'Summary statistics for all employees salary calculated successfully')
  } catch (error) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR')
  }
}

exports.onContractSummary = async (req, res) => {
  try {
    const employeeOnContract = employee.filter(emp => emp.on_contract === true)
    const data = this.summaryStats(employeeOnContract)
    return successResponse(res, httpStatus.OK, data, 'Summary statistics for employees on contract calculated successfully')
  } catch (error) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR')
  }
}

exports.departmentSummary = async (req, res) => {
  try {
    const departmentStats = {}
    employee.forEach(emp => {
      if (!departmentStats[emp.department]) {
        departmentStats[emp.department] = []
      }
      departmentStats[emp.department].push(emp)
    })

    const departmentWiseSummary = {}
    for (const dept in departmentStats) {
      departmentWiseSummary[dept] = this.summaryStats(departmentStats[dept])
    }
    return successResponse(res, httpStatus.OK, departmentWiseSummary, 'Department wise summary statistics calculated')
  } catch (error) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR')
  }
}

exports.subDepartmentSummary = (req, res) => {
  const subDepartmentStats = {}
  employee.forEach(emp => {
    const key = `${emp.department}-${emp.sub_department}`
    if (!subDepartmentStats[key]) {
      subDepartmentStats[key] = []
    }
    subDepartmentStats[key].push(emp)
  })

  const subDepartmentSummaryStats = {}
  for (const key in subDepartmentStats) {
    const [department, subDepartment] = key.split('-')
    if (!subDepartmentSummaryStats[department]) {
      subDepartmentSummaryStats[department] = {}
    }
    subDepartmentSummaryStats[department][subDepartment] = this.summaryStats(subDepartmentStats[key])
  }
  return successResponse(res, httpStatus.OK, subDepartmentSummaryStats, 'Sub department wise summary stats calculated successfully')
}
