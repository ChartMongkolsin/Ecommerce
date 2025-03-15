const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')

module.exports.register = async (req, res, next) => {
    try {
        /* หน้าบ้านส่งอะไรมา รับจากหลังบ้า */
        const { email, firstName, lastName, password, confirmPassword } = req.body
        // validation
        if (!(email.trim() && firstName.trim() && lastName && password && confirmPassword)) {
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
            firstName,
            lastName,

        }

        const result = await prisma.user.create({ data: newUser })

        res.json({ msg: 'Register successful', result })
    } catch (error) {
        next(error)
    }

}


module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // validation
        if (!email.trim() || !password.trim()) {
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
        console.log(payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
        const { password: pwd, createdAt, updatedAt, ...userData } = findUser
        res.json({ token: token, email: userData })

    } catch (error) {
        next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, firstName, lastName } = req.body;

        console.log("Updating user:", { id, email, firstName, lastName });


        const upadateUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                firstName,
                lastName,
            },
        });
        res.json({ msg: "Update", user: upadateUser })
    } catch (error) {
        next(error)
    }
}


module.exports.getMe = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        console.log(req.user)
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, firstName: true, lastName: true, email: true } // เลือกเฉพาะข้อมูลที่ต้องการ
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user: req.user })

    } catch (error) {
        next(error)
    }
}