const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next({
            message: 'Not authorized, no token',
            status: 401
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if(!user) {
            return next({
                message: 'Not authorized, user not found',
                status: 401
            })
        }
        req.user = user;
        next();
    } catch (error) {
      console.log(error.message);
      next({
         message: 'Not authorized, token failed',
         status: 401
      })
    }
}