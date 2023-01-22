const mongoose = require('mongoose')


const deptSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            amount:{
                type:Number,
                required:true,
                default:0
            }
        }
    ],
    from:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            amount:{
                type:Number,
                required:true,
                default:0
            }
        }
    ]
},{
    timestamps:true
})

const Dept = mongoose.model('Dept',deptSchema)
module.exports = Dept