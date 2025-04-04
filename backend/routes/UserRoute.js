import express from 'express';
import { googleAuth, login, register} from '../controllers/UserController.js';
import { forgotPassword, resetPassword } from '../controllers/ForgotPasswordController.js';

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/google",googleAuth);
userRouter.post("/login",login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;