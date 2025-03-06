const { login}=require('../../Controllers/authController/loginController')
const express=require('express')
const router = express.Router()

router.route('/login').post(login)

module.exports=router