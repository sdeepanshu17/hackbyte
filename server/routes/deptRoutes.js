const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const { addDept } = require('../controllers/deptControllers')
const router = express.Router()

router.route('/').post(protect,addDept)

module.exports = router