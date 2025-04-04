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

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

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

export const googleAuth = async (req, res) => {
    const {name,email} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
            return res.status(200).json({
                success: true,
                message: "User signed in successfully",
                token,
                user: {
                    fullname: existingUser.fullname,
                    email: existingUser.email,
                },
            });
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                fullname: name,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,
                user: {
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ success:false, message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found !" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.status(200).json({
            success: true,
            message: "User Signed in successfully",
            token,
            user: {
                fullname: user.fullname,
                email: user.email,
            },
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const changePassword = async (req, res) => {
    try{
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }


        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!validPassword) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);

        await user.save();
        res.status(200).json({ success: true, message: "Password changed successfully" });

    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error changing password" });
    }
}	


export const getUser = async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id).select("-password -__v");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            name: user.fullname,
            email: user.email,
         });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

