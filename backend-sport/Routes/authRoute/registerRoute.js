const {register}=require('../../Controllers/authController/registerController')
const express=require('express')
const router = express.Router()
router.route('/register').post(register)


module.exports=router