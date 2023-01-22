const Transaction = require("../models/TransactionModel");
const User = require("../models/UserModel");

const AddMoney = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $inc: {
                balance: amount
            }
        }, {
            new: true,
        }).select("-password")
        // Transaction 
        await Transaction.create({
            from:user,
            to:user,
            amount,
            status:'success',
            message:'Money Added'

        })
        res.status(200).json({
            message: "Money Added",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const TransferMoney = async (req, res) => {
    const { amount, userId } = req.body;

    if (amount > req.user.balance) {
        res.status(400).json({
            message: "Insufficient Balance"
        })
    }


    try {
        const user = await User.findById(req.user._id);
        const user2 = await User.findById(userId);
        
        if(user2){
            user.balance -= amount;
            user2.balance += amount;
            await user.save();
            await user2.save();

            // Creating Transaction---------
            await Transaction.create({
                from:user,
                to:user2,
                status:"success",
                amount,
                message:"Money Transfer"
            })
            // -----------------------------
            res.status(200).json({
                message: "Money Transfered",
                user,
                user2
            })
        }else{
            res.status(400).json({
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}
const SplitMoney = async(req,res)=>{
    // const {amount,}
}

const GetUserTransaction = async(req,res)=>{
    try {
        const userId = req.user._id;
        console.log(userId);
        const transaction = await Transaction.find({$or:[{from:userId.toString()},{to:userId.toString()}]})
            .sort("createdAt")
            .populate("from","name")
            .populate("to","name")
        res.status(200).json({
            transaction
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports = { AddMoney,TransferMoney ,GetUserTransaction }