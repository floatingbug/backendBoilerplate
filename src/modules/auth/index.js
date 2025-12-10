const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/refresh', controller.refreshToken);

module.exports = router;
