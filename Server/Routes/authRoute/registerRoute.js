const {register}=require('../../Controllers/authController/registerController')
const express=require('express')
const router = express.Router()
const multer = require('multer');


filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback)=>{
      let date = Date.now();
      //image/png
      let fl = date + '.' + file.mimetype.split('/')[1];
      callback(null , fl);
      filename = fl;
    }
})

const upload = multer({storage: mystorage})


router.post('/register', upload.single('image'), register);


module.exports=router