import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "45s"});
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}