// src/modules/auth/index.js
const { Router } = require('express');
const controller = require('./controller');
const validateSignup = require('../../middlewares/validateSignup');
const validateLogin = require('../../middlewares/validateLogin');
const validateRefreshToken = require('../../middlewares/validateRefreshToken');
const rateLimit = require('express-rate-limit');
const config = require('../../config');

const router = Router();

// Auth-specific rate limiter
const authLimiter = rateLimit(config.rateLimitConfig.auth);

router.post('/signup', authLimiter, validateSignup, controller.signup);
router.post('/login', authLimiter, validateLogin, controller.login);
router.post('/refresh', validateRefreshToken, controller.refreshToken);

module.exports = router;
