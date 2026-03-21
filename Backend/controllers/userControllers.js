import User from '../models/userModel.js'
import {validationResult} from 'express-validator'
import { hashPassword, generateAuthToken, comparePassword } from '../utils/password.js';
import BlockedToken from '../models/blockedTokens.js';

export const registerUser = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists'})
        }   
        const hashed = await hashPassword(password);
        const user = await User.create({name, email, password: hashed})
        const token = generateAuthToken(user);
        res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'})
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error})
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(401).json({message: 'New user please signup'})
        }
        else {
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }
            const token = generateAuthToken(user);
            res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'})
            res.status(200).json({user, token})
        }

    } catch (error) {
        res.status(500).json({message: 'Error creating user', error})
    }
}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json({user: req.user})
}


export const LogoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
        if (token) {
            await BlockedToken.create({ token });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out user', error });
    }
};