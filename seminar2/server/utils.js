const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    const token = bearerToken?.split(' ')[1];

    if (!token) {
        return res.status(400).json({success: false, message: 'Token not found', data: {}})
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(400).json({success: false, message: 'Unauthorized - Invalid token', data: {}}) 
        }

        req.userId = decoded.id;

        next();
    })
}

module.exports = {
    verifyToken
}