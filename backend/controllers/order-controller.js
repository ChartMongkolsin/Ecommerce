const createError = require('../utils/createError')
const prisma = require('../config/prisma');

module.exports.getAllOrder = async(req,res,next)=>{
    try {






        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
module.exports.createOrder = async(req,res,next)=>{
    try {






        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
module.exports.updateOrder = async(req,res,next)=>{
    try {











        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
module.exports.deletedOrder = async(req,res,next)=>{
    try {



        
        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
