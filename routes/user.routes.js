const router = require('express').Router(),
    authController = require('../controllers/auth.controller');

router.post('/register', authController.signUp);

module.exports = router;