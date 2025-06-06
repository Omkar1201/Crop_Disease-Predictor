const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signup = async (req, res) => {
    try {
        let { userName, password } = req.body

        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        userName = userName.trim(), password = password.trim()

        const isUserPresent = await User.findOne({ userName })
        // Check is user already present
        if (isUserPresent) {
            return res.status(409).json({
                success: false,
                message: 'User exist, Try another userName'
            })
        }

        // Hash password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: `Unable to hash the password ${err.message}`
            })
        }

        await User.create({ userName, password: hashedPassword })
        return res.status(201).json({
            success: true,
            message: 'Sign up successfull!'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const login = async (req, res) => {
    try {
        let { userName, password } = req.body

        if (!userName || !password) {
            return res.status(400).json({ success: false, message: 'userName and password are required' });
        }

        userName = userName.trim()
        password = password.trim()

        const userData = await User.findOne({ userName })
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // ispasswordmatched
        const isPasswordMatched = await bcrypt.compare(password, userData.password)
        if (isPasswordMatched) {

            const payload = {
                userName: userData.userName,
                userId: userData._id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
            const options = {
                httpOnly: true,
                secure: process.env.ENVIRONMENT === "PRODUCTION",
                sameSite: process.env.ENVIRONMENT === "PRODUCTION" ? "None" : "Lax",
                maxAge: 30 * 24 * 60 * 60 * 1000, 
            };

            const userWithoutPassword = userData.toObject();
            delete userWithoutPassword.password;

            return res.cookie('authToken', token, options).status(200).json({
                success: true,
                message: `Login successfull (Hi ${userData.userName})`
            })
        }
        else {

            return res.status(401).json({
                success: false,
                message: 'Password does not match'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
module.exports = { signup, login }


