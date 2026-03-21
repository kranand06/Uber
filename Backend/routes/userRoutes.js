import express from 'express';
import {body} from 'express-validator';
import { registerUser, loginUser, getUserProfile, LogoutUser } from '../controllers/userControllers.js';
import { checkUserAuth } from '../middlewares/auth.js';

const userRouter = express.Router();


userRouter.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], registerUser);


userRouter.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], loginUser);

userRouter.get('/profile', checkUserAuth, getUserProfile);

userRouter.get('/logout', checkUserAuth, LogoutUser);

export default userRouter;
