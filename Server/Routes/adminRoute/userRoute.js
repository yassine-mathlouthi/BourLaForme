const express = require('express');
const router = express.Router();
const authMiddleware = require("../../Middleware/authentification");
const { getValidatedUsers, getNonValidatedUsers, getNonValidatedCoachs, getValidatedCoachs, deleteUser } = require('../../Controllers/adminController/userController');

router.get('/validated', authMiddleware(["admin"]), getValidatedUsers);
router.get('/nonvalidated', authMiddleware(["admin"]), getNonValidatedUsers);
router.get('/nonvalidatedcoachs', authMiddleware(["admin"]), getNonValidatedCoachs);
router.get('/validatedcoachs', authMiddleware(["admin"]), getValidatedCoachs);
router.delete('/deleteUser/:id', authMiddleware(["admin"]), deleteUser);

module.exports = router;