import User from "../models/user.js";
import {generateTokens} from "../utils/jwtUtil.js";

const users = []

export const login = (req, res) => {
    const {login, mdp} = req.body;
    console.log(login, mdp)
    const user = new User(1, login, mdp, "admin")
    const tokens = generateTokens(user);
    user.createRefreshToken(tokens.refreshToken);
    users.push(user);

    // res.cookie('refreshToken', tokens.refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production'
    // })

    // console.log(res.getHeaders());

    res.json({accessToken: tokens.accessToken});
}