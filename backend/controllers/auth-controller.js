const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')

module.exports.register = async (req, res, next) => {
    try {
        const { email, name, password, confirmPassword } = req.body
        // validation
        if (!(email.trim() && name.trim() && password && confirmPassword)) {
            createError(400, "Please fill all data")
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            createError(400, "Please check type Email !!")
        }

        if (password !== confirmPassword) {
            createError(400, "check confirm Password")
        }
        // check if already email 

        const findemail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (findemail) {
            createError(409, `Already have this ${email}`)
        }

        // create user in db
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            email: email,
            password: hashedPassword,
            name,
        }

        const result = await prisma.user.create({ data: newUser })

        res.json({ msg: 'Register successful', result })
    } catch (error) {
        next(error)
    }

}


module.exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body

        // validation
        if (!(email.trim() && password.trim())) {
            createError(400, "Please fill all data")
        }


        const findUser = await prisma.user.findUnique({
            where: { email: email }
        })
        console.log(findUser)
        if (!findUser) {
            createError(401, 'invalid login')
        }
        // check password

        let pwOk = await bcrypt.compare(password, findUser.password)
        if (!pwOk) {
            createError(401, 'invalid login')
        }

        const payload = {
            id: findUser.id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
        const { password: pwd, createdAt, updatedAt, ...userData } = findUser
        res.json({ token: token, user: userData })

    } catch (error) {
        next(error)
    }
}

module.exports.getMe = async (req, res,next) => {
    try {
        res.json({ user: req.user })

    } catch (error) {
        next(error)
    }
}