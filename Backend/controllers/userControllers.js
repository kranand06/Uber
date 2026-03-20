import User from '../models/userModel.js'
import {validationResult} from 'express-validator'
import { hashPassword,generateAuthToken } from '../utils/password.js';

export const registerUser = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({errors: validationErrors.array()})
        }
        const {name, email, password} = req.body;
        const hashed = await hashPassword(password);
        const user = await User.create({name, email, password: hashed})
        const token = generateAuthToken(user);
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error})
    }
}