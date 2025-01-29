import {verifyToken} from '../utils/jwtUtil.js';

export const authenticateJWT = (req, res, next) => {
    const token = req.headers['token'];

    if (!token) {
        return res.status(403).json({message: 'Token is required'});
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }

    req.user = decoded.user;
    next();
}