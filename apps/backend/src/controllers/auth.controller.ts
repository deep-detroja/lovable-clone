import { Request,Response,NextFunction } from "express";
import {signinSchema, UserSchema} from "@repo/types/schema";
import bcrypt from "bcrypt";
import {prismaClient} from "@repo/database/db"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";



export const signup = async (req:Request,res:Response)=>{
    
        const parsedData=UserSchema.safeParse(req.body);
        if(!parsedData.success){
              return res.status(400).json({
               message: "Invalid data"
            });
        }
        try{

             const { email, password, name } = parsedData.data;
  

             // check if user exist already or not
            const user = await prismaClient.user.findUnique({
                where: {
                 email,
                },
            });
            if (user){
               return res.status(409).json({
                    message:"email already exist"
                })
            }
            //hash the password
            const hashedPassword= await bcrypt.hash(password, 10);
    
            //create new user
            const newUser = await prismaClient.user.create({
               data:{ 
                email,
                password : hashedPassword,
                name
               }
            })
            return res.status(201).json({message:"new User created" });

        }catch(err){
            console.error("Signup error:", err);

    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : String(err),
    });
            
            // res.status(500).json({ message: "Server error" });
            //  console.error("Signup error:", err);
            // return;

        }
};



export const signin= async (req:Request,res:Response)=>{

    
       
        const parsedData=signinSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.status(400).json({ message: "Missing inputs" });
        }
    try{
         const { email, password } = req.body;
         const user = await prismaClient.user.findUnique({
             where: { email },
         });

        if(!user){
            console.log('User not found:', email);
           return res.status(403).json({ message: "Invalid email or password" });
        }

         // Compare passwords
         const isPasswordValid = await bcrypt.compare(password,user.password);

         if(!isPasswordValid){
            console.log('Invalid password for:', email);
            return res.status(403).json({ message: "Invalid email or password" });
         }
         // ✅ Success
        console.log('Login successful:', email);
        const token = jwt.sign(
             { userId: user.id },
             JWT_SECRET,
             { expiresIn: "7d" }
    );

    return res.json({ token });
    }catch(err){
         console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });

    }
}

// ---------------------- GET LOGGED IN USER DATA ----------------------
export const me = async (req:Request,res:Response)=>{
    try {
        const userId = req.userId;

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
         if (!user) {
             return res.status(404).json({
                 message: "User not found",
             });
         }

         return res.status(200).json({
             user,
         });

     }catch(err){
        console.error('Failed to fetch user:', err);
        res.status(500).json({ message: 'Internal server error' });
     }
};

// ---------------------- UPDATE LOGGED IN USER DATA ----------------------
export const profile = async (req:Request,res:Response){
    try {
  const { name, photo } = req.body;
  const userId = req.userId;

  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      photo,
    },
    select: {
      id: true,
      email: true,
      name: true,
      photo: true,
    },
  });

  return res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
} catch (error) {
  return res.status(500).json({
    message: 'Error updating profile',
  });
}
}