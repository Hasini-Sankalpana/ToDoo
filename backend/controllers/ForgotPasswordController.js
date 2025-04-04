import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { sendResetPasswordEmail } from '../config/mailer.js';

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user=await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetToken =jwt.sign(
           { userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendResetPasswordEmail(
            email,
            resetLink
        )

        return res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user=await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ message: 'Invalid or Expired Token' });
    }
    }