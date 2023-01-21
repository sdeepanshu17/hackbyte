const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Dept = require('./deptModel');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
        balance:{
            type:Number,
            require:true,
            default:0,
        },
        dept:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Dept'
        }
    },{
        timestamps:true
    }
);

userSchema.methods.matchPassword = async function(enteredPassword){
    return (await bcrypt.compare(enteredPassword,this.password));
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.post('save', async function (doc) {
    console.log(doc);
    await Dept.create({
        user:doc._id,
        to:[{
            user:doc._id,
            amount:0
        }]
    })
})

const User = mongoose.model("User",userSchema);
module.exports = User;