const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
},{
    timestamps:true
})

const Group = mongoose.model('Group',groupSchema);
module.exports = Group;