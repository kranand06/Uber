import Driver from '../models/driverModel.js';
import {validationResult} from 'express-validator'
import { hashPassword, generateAuthToken, comparePassword } from '../utils/password.js';
import BlockedToken from '../models/blockedTokens.js';

export const registerDriver = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }
        const {name, email, password, vehicle} = req.body;
        const existingDriver = await Driver.findOne({email});
        if (existingDriver) {
            return res.status(400).json({message: 'Driver with this email already exists'})
        }
        const hashed = await hashPassword(password);
        const driver = await Driver.create({name, email, password: hashed, vehicle})
        const token = generateAuthToken(driver);
        res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'})
        res.status(201).json({driver, token})
    } catch (error) {
        res.status(500).json({message: 'Error creating driver', error})
    }
}


export const loginDriver = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }
        const {email, password} = req.body;

        const driver = await Driver.findOne({email}).select('+password');
        if(!driver) {
            return res.status(401).json({message: 'New driver please signup'})
        }
        else {
            const isMatch = await comparePassword(password, driver.password);
            if (!isMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }
            const token = generateAuthToken(driver);
            res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'})
            res.status(200).json({driver, token})
        }

    } catch (error) {
        res.status(500).json({message: 'Error creating driver', error})
    }
}

export const getDriverProfile = async (req, res, next) => {
    res.status(200).json({driver: req.driver})
}


export const LogoutDriver = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
        if (token) {
            await BlockedToken.create({ token });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Driver logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out driver', error });
    }
};