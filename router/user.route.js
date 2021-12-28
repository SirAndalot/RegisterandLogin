const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const { verifyUserToken,IsUser } = require("../middleware/auth");



router.post ('/register', userController.register)
router.post ('/login', userController.login)
router.get (`/user/:id`, userController.getUserByID)
router.delete (`/user/delete/:id`,verifyUserToken,IsUser,userController.deleteUser)
router.patch (`/user/update/:id`, userController.updateUser)

// router.get('/events', verifyUserToken, IsUser, userController.userEvent);





module.exports = router;