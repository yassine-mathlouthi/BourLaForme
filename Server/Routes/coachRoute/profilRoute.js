const express = require("express");
const router = express.Router();
const {  getCoachProfile, updateCoachProfile  } = require("../../Controllers/coachController/profilController");
const authMiddleware = require("../../Middleware/authentification");
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


// Route pour que le coach consulte ses réservations
router.get("/", authMiddleware(), getCoachProfile);
router.put("/", upload.single('image'), authMiddleware(), updateCoachProfile);


module.exports = router;