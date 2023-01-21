const express = require('express');
const { RegisterUser, LoginUser, getAuthUser, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/').get(protect,getAuthUser)
router.route('/allusers').get(protect,getAllUsers)
router.route('/register').post(RegisterUser)
router.route('/login').post(LoginUser)


module.exports = router