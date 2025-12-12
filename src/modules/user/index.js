const { Router } = require('express');
const controller = require('./controller');
const authUser = require('../../middlewares/authUser');

const router = Router();

router.get('/me', authUser, controller.getUser);

module.exports = router;
