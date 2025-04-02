const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middleware/authentification");
const { addCourse, getAllCourses, updateCourse, deleteCourse } = require('../../Controllers/adminController/courseController');
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

router.post('/', upload.single('image'), authMiddleware(["admin"]), addCourse);
router.get('/', getAllCourses);
router.put('/:id', upload.single('image'), authMiddleware(["admin"]), updateCourse);
router.delete('/:id', authMiddleware(["admin"]), deleteCourse);

module.exports = router;