import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';

dotenv.config();

export const register = async (req, res) => {
    const{ fullname, email, password,confirmPassword } = req.body;

    try {
        if(!fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success:false,message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ success:false,message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        //console.log('user saved:', savedUser);

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Generated Token:', token);  
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, 
            user: {
                fullname: savedUser.fullname,
                email: savedUser.email,
            },
        });
    
    }catch (error) {
        console.error(error);
        res.status(500).json({ success:false, message: "Internal server error" });
    }
}