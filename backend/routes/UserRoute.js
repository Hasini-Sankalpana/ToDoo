import express from 'express';
import { changePassword, getUser, googleAuth, login, register} from '../controllers/UserController.js';
import { forgotPassword, resetPassword } from '../controllers/ForgotPasswordController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/google",googleAuth);
userRouter.post("/login",login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/change-password", authMiddleware,changePassword);
userRouter.get("/profile", authMiddleware,getUser);

export default userRouter;