const jwt = require('jsonwebtoken')

const { User } = require('../models/userModel')

const authorizeUser = async (req, res, next) => {
    // console.log('access-token : ', req.headers['x-access-token']);
    const token = req.headers['x-access-token']
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const userId = user.userToken
        const userFound = await User.findOne({ userId: userId })
        if (userFound) {
            req.isAuth = true
            console.log('Token Verified Successfully');
        } else {
            console.log('Token Verification Failed');
            req.isAuth = false
        }
    } catch (error) {
        console.log('jwt error : ', error);
        req.isAuth = false
    }
    next()
}

module.exports = { authorizeUser }