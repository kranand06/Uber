import express from 'express';
import {body} from 'express-validator';
import { registerUser } from '../controllers/userControllers.js';

const userRouter = express.Router();


userRouter.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], registerUser);

export default userRouter;
