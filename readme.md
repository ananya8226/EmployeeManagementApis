# Employee Management API

A micro-service to address some functionality which is useful to
derive simplified summary statistics (mean, min, max) on a employee dataset.

## Prerequisites

Install Node before running this project.
- Node.js: Download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Download the project or Clone this repository:
   git clone https://github.com/yourusername/employee-management-api.git

2. Navigate to the project directory
   cd project-directory-path

3. Install dependencies
   npm install

4. Start the server
   npm start

## Run the APIs
 
You can use Postman or ThunderClient to test this REST APIs manually.

1. Login 
   PATCH /user/login
   http://localhost:5000/user/login (if port=5000)
   req.body = {
    "username" : "ananya",
    "password" : "Ananya@123"
   }

Copy token from session field of response on login and paste it in req.headers.authorization along with 'Bearer' prefix, for running rest of the APIs.

2. Add Employee
POST /user/add-employee
http://localhost:5000/user/add-employee

req.body = {
   "name": "Ananya",
  "salary": 75000,
  "currency": "USD",
  "department": "Engineering",
  "sub_department": "Platform"
}
 
3. Delete Employee 
DELETE /user/delete-employee/:name
http://localhost:5000/user/delete-employee/Ananya

4. Get summary stats for salaries of entire employees
GET /user/entire-salary-summary
http://localhost:5000/user/entire-salary-summary

5. Get summary stats for salaries of employees with on_contract = true
GET /user/on-contract-salary-summary
http://localhost:5000/user/on-contract-salary-summary

6. Get department wise summary stats for salaries
GET /user/entire-salary-summary
http://localhost:5000/user/department-wise-summary

7. Get summary stats for salaries in sub-departments of each department
GET /user/entire-salary-summary
http://localhost:5000/user/subdepartment-wise-summary
