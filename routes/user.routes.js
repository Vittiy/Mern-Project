const router = require('express').Router(),
    authController = require('../controllers/auth.controller'),
    userController = require('../controllers/user.controller');

// auth
router.post('/register', authController.signUp);

// user db
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;