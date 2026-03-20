import express from 'express';
import {body} from 'express-validator';
import { registerUser, loginUser } from '../controllers/userControllers.js';

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

export default userRouter;
