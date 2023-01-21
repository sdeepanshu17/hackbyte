const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        enum:['pending','success','failed'],
        default:'pending'
    },
    message:{
        type:String,
        default:''
    }
},{
    timestamps:true
})

const Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction