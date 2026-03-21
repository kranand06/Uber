import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import BlockedToken from '../models/blockedTokens.js';
import Driver from "../models/driverModel.js";


export const checkUserAuth = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    const isBlocked = await BlockedToken.findOne({ token });
    if (isBlocked) {
        return res.status(401).json({ message: 'Unauthorised Access' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}
export const checkDriverAuth = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    const isBlocked = await BlockedToken.findOne({ token });
    if (isBlocked) {
        return res.status(401).json({ message: 'Unauthorised Access' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.driver = await Driver.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

