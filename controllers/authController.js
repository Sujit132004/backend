const User=require('../models/User');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"UserAlready exists!",
            })
        };

        user=new User({name,email,password});
        user.password=await bcrypt.hash(password,10);
        await user.save();

        const token=jwt.sign({user:{id:user.id}},process.env.JWT_SECRET);
        return res.json({token});
    }
    catch(err){
        return res.status(500).json({
            message:"Error occured while registering!",
        })
    }
};


exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});


        if(!user){
            return res.status(400).json({
                message:"User not Found!",
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({
                message:"Invalid Credentials!",
            });
        }

        const token=jwt.sign({user:{id:user.id}},process.env.JWT_SECRET);
        return res.json({token,
            user:{
                name:user.name,
                email:user.email
            }

        });

    }
    catch(error){
        return res.status(500).json({
            message:"Error occured while  logging In!"
        });
    }
}