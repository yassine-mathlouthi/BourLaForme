const express = require('express');
const router = express.Router();
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

router.post('/', upload.single('image'), addCourse);
router.get('/', getAllCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;