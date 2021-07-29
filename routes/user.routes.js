const router = require('express').Router(),
    authController = require('../controllers/auth.controller'),
    userController = require('../controllers/user.controller');

// auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user db
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow)

module.exports = router;