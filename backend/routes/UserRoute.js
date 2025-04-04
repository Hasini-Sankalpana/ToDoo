import express from 'express';
import { googleAuth, register} from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/google",googleAuth);

export default userRouter;