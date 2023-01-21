const generateToken = require("../config/generateToken");
const User = require("../models/UserModel");

const RegisterUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        if(!name || ! email || !password){
            res.status(400)
            throw new Error("Please enter all fields")
        }
        const userExist = await User.findOne({
            email
        })
        // console.log(userExist);
        if(userExist){
            res.status(400)
            throw new Error("User already exists")
        }
        const user = await User.create({
            name,
            email,
            password
        })
        if(user){
            res.status(201).json({
                // _id:user._id,
                // name:user.name,
                // email:user.email,
                token:generateToken(user._id)
            })
        }

    } catch (error) {
        res.status(400)
        res.json({
            message:error.message
        })
    }
}

const LoginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            res.status(400)
            throw new Error("Please enter all fields")
        }
        const user = await User.findOne({
            email
        })
        if(user && (await user.matchPassword(password))){
            res.json({
                token:generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error("Invalid email or password")
        }
        
    } catch (error) {
        res.status(400)
        res.json({
            message:error.message
        })
    }
}

const getAuthUser = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        if(user){
            res.status(200)
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                balance:user.balance,
                dept:user.dept
            })
        }
    } catch (error) {
        res.status(400)
        res.json({
            message:error.message
        })
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find().select("-password");
        res.status(200)
        res.json(users)
    } catch (error) {
        res.status(400)
        res.json({
            message:error.message
        })
    }
}

module.exports = {RegisterUser,LoginUser,getAuthUser,getAllUsers};