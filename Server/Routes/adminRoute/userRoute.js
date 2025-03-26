const express = require('express');
const router = express.Router();
const { getValidatedUsers, getNonValidatedUsers, getNonValidatedCoachs, getValidatedCoachs, deleteUser } = require('../../Controllers/adminController/userController');

router.get('/validated', getValidatedUsers);
router.get('/nonvalidated', getNonValidatedUsers);
router.get('/nonvalidatedcoachs', getNonValidatedCoachs);
router.get('/validatedcoachs', getValidatedCoachs);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;