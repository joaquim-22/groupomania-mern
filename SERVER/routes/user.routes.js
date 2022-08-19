const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const { upload } = require('../middleware/multerConfig');

// auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);   
router.get('/logout', authController.logout);  

//user display: 'block',
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete('/:id', userController.deleteUser);

//upload
router.patch('/upload', upload.single("file"), uploadController.uploadProfil);

module.exports = router;