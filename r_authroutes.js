//routes//
const express = require('express')
const authrouter = express.Router()
const firstel = require('../helpers/auth_reg-log')
//const secondel = require('../helpers/product')

const { validatesignup, userValidation } = require('../middleware/user')    
authrouter.post('/signup', validatesignup, userValidation, firstel.signup)
authrouter.post('/signin',firstel.signin)
authrouter.post('/add', firstel.Addproduct)
authrouter.post('/update', firstel.update)
authrouter.post('/overall', firstel.findProduct)
authrouter.post('/remove', firstel.remove)
// authrouter.post('/productinsert', secondel.viewstores)
// authrouter.get('/productfind', secondel.finding)
module.exports = authrouter;