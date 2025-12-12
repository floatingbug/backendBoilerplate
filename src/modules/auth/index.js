const { Router } = require('express');
const controller = require('./controller');
const validateSignup = require('../../middlewares/validateSignup');
const validateLogin = require('../../middlewares/validateLogin');
const validateRefreshToken = require('../../middlewares/validateRefreshToken');
const rateLimit = require('express-rate-limit');
const config = require('../../config');
const router = Router();

const authLimiter = config.env === "production"
    ? rateLimit(config.rateLimitConfig.auth)
    : (req, res, next) => next();


router.post('/signup', authLimiter, validateSignup, controller.signup);
router.post('/login', authLimiter, validateLogin, controller.login);

router.post('/refresh', validateRefreshToken, controller.refreshToken);
router.get('/verify-email', controller.verifyEmail);

module.exports = router;
