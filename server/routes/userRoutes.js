const express = require('express');
const { RegisterUser, LoginUser, getAuthUser, getAllUsers, searchUsers, addFriend, removeFriend, getFriends, getUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/getuser').post(getUser)

router.route('/').get(protect,getAuthUser)
router.route('/search').get(protect,searchUsers)
router.route('/allusers').get(protect,getAllUsers)
router.route('/register').post(RegisterUser)
router.route('/login').post(LoginUser)

// Friends
router.route('/getfriends').get(protect,getFriends)
router.route('/addfriend').post(protect,addFriend)
router.route('/removefriend').post(protect,removeFriend)


module.exports = router