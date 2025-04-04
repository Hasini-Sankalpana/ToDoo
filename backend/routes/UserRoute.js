import express from 'express';
import { googleAuth, login, register} from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/google",googleAuth);
userRouter.post("/login",login);

export default userRouter;