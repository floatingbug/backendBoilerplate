const { Router } = require('express');
const controller = require('./controller');
const authUser = require('../../middlewares/authUser');

const router = Router();

router.get('/me', authUser, controller.getUser);
router.delete("/me", authUser, controller.deleteUser);

module.exports = router;
