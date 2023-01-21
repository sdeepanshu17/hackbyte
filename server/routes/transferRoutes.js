const express = require('express')
const { AddMoney, TransferMoney, GetUserTransaction } = require('../controllers/transferController')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/add').post(protect,AddMoney)
router.route('/transfer').post(protect,TransferMoney)
// router.route('/split').post(protect,)
router.route('/transactions').get(protect,GetUserTransaction)


module.exports = router