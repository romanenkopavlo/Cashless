import {generateTokens} from '../utils/jwtUtil.js';
import User from '../models/user.js';
import jwt from "jsonwebtoken";

const users = [];

export const login = async (req, res) => {
    const {username, password} = req.body;

    if (username === "admin" && password === "Admin853!?") {
        const user = new User(1, username, password, "admin");

        const tokens = generateTokens(user);
        user.createRefreshToken(tokens.refreshToken);
        users.push(user)

        console.log(tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        console.log(res.getHeaders());

        res.json({accessToken: tokens.accessToken});
    } else {
        return res.status(401).json({message: 'Invalid credentials'});
    }
}

export const getNewAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        console.log(refreshToken);
        return res.status(400).json({message: 'Refresh token is required'});
    }

    if (!users.find(user => user.refreshToken === refreshToken)) {
        return res.status(403).json({error: 'Invalid refresh token'});
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({id: payload.id, username: payload.username, role: payload.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION})
        res.json({accessToken: newAccessToken});
    } catch (error) {
        res.status(403).json({error: 'Invalid or expired refresh token'});
    }
}
