const express = require('express');
const router = express.Router();
const { addCourse, getAllCourses, updateCourse, deleteCourse } = require('../../Controllers/adminController/courseController');
const multer = require('multer');

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{
      let date = Date.now();
      let fl = date + '.' + file.mimetype.split('/')[1];
    }
})


router.post('/', addCourse);
router.get('/', getAllCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;