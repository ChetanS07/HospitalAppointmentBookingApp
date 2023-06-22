const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { userId, User } = require('../models/userModel')

const saltRounds = 10;

const addUser = async (req, res) => {
    let { userId, password } = req.body
    password = await bcrypt.hash(password, saltRounds)

    const user = new User({
        userId: userId,
        password: password
    })
    try {
        let status = 'failure'
        let reason = ''
        const regUser = await User.findOne({ userId: userId }).exec()

        if (!regUser || regUser === null || regUser === undefined) {
            user.save()
            console.log('Registered User Successfully');
            status = 'success'
            reason = 'registration successful'
        } else {
            reason = 'User Already Exist'
            console.log('User Already Exist');
        }
        res.send({ status: status, reason: reason })
    } catch (err) {
        console.log('Failed to register User');
        res.send({ status: 'failure', reason: 'error' })
    }
}

const login = async (req, res) => {
    const { userId, password } = req.body

    try {
        const regUser = await User.findOne({ userId: userId }).exec()

        if (regUser) {
            const isValid = await bcrypt.compare(password, regUser.password)

            if (isValid) {
                const token = jwt.sign(
                    {
                        userToken: userId
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' }
                )
                console.log('Succesfully logged In');
                res.send({ status: 'success', userToken: token })
            } else {
                console.log('Falied to logged In : Password mismatch');
                res.send({ status: 'failure', userToken: false, reason: 'password mismatch' })
            }

        } else {
            console.log('Failed to Login : User not found');
            res.send({ status: 'failure', userToken: false, reason: 'user not found' })
        }

    } catch (err) {
        console.log('Failed to Login User');
        res.send({ status: 'failure', userToken: false, reason: 'error' })
    }
}

const logout = async (req, res) => {
    //delete jwt token
}

module.exports = {
    addUser: addUser,
    login: login,
    logout: logout
}