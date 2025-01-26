import {generateToken} from '../utils/jwtUtil.js';
import User from '../models/user.js';

export const login = async (req, res) => {
    const {username, password} = req.body;

    if (username !== "admin" || password !== "Admin853!?") {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const user = new User(1, username, password, "admin");

    const token = generateToken(user);
    res.json({token});
}
