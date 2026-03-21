import express from 'express';
import {body} from 'express-validator';
import { registerDriver, loginDriver, getDriverProfile, LogoutDriver } from '../controllers/driverControllers.js';
import { checkDriverAuth } from '../middlewares/auth.js';

const driverRouter = express.Router();


driverRouter.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.model').notEmpty().withMessage('Vehicle model is required'),
    body('vehicle.licensePlate').isLength({min: 9}).withMessage('License plate must be at least 9 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto')
], registerDriver);


driverRouter.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], loginDriver);

driverRouter.get('/profile', checkDriverAuth, getDriverProfile);

driverRouter.get('/logout', checkDriverAuth, LogoutDriver);

export default driverRouter;
