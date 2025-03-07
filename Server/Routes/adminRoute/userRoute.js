const express = require('express');
const router = express.Router();
const { getValidatedUsers, getNonValidatedUsers } = require('../../Controllers/adminController/userController');

router.get('/validated', getValidatedUsers);
router.get('/nonvalidated', getNonValidatedUsers);

module.exports = router;