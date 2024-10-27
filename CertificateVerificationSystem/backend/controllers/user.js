import { User } from "../models/userModel.js";
import { Data } from "../models/DataModel.js";
import bcryptjs from "bcrypt"
import jwt from "jsonwebtoken"

export const Certificate=async(req,res)=>{
    const {certificateId}=req.body;
    // console.log("REQ",req.body);
    const user=await Data.findOne({certificateId});
    try {
        if(!user){
            return res.status(401).json({
                message:"Invalid Certificate ID",
                success:false
            });
        }
    
        return res.status(200).json({
            message:"Certificate retrieved",
            success:true,
            userData:user
        })
        
    } catch (error) {
        console.log(error);
    }
    
}

export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        };

        const user=await User.findOne({email});
        const userRole=user.role;
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            });
        }

        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            });
        }

        const tokenData = {
            id:user._id
           }
        //to check user is logged in or not
        const token=await jwt.sign(tokenData,"dbwubdajjaowvwuveshivsv",{expiresIn:"1d"});
        return res.status(200).cookie("token",token,{httpOnly:true}).json({
            message:`Wecome back ${user.fullName}`,
            userRole:userRole,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const Logout = async(req,res)=>{
    return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
        message:"user logged out successfully.",
        success:true,
    });
}

export const Register = async (req,res) =>{
    try {
        const {fullName, email, password, role} = req.body;
        console.log("role:",role);
        if(!fullName || !email || !password || !role){
            return res.status(401).json({
                message:"Invalid data",
                success:false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"This email is already used",
                success:false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password,16);

        await User.create({
            fullName,
            email,
            password:hashedPassword,
            role
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success:true,
        })

    } catch (error) {
        console.log(error);
    }
};