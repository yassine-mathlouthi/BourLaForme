const {register} = require('../../Controllers/authController/registerController')
const express = require('express')
const router = express.Router()
const multer = require('multer');

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        callback(null, fl);
    }
})

const upload = multer({ 
    storage: mystorage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5MB
})

router.post('/register', upload.single('image'), register);

module.exports = router