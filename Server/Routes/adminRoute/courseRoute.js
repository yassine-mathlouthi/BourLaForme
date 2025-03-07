const express = require('express');
const router = express.Router();
const { addCourse, getAllCourses, updateCourse, deleteCourse } = require('../../Controllers/adminController/courseController');

router.post('/', addCourse);
router.get('/', getAllCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;