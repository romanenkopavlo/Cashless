import User from "../models/user.js";
import {generateTokens} from "../utils/jwtUtil.js";

const users = []

export const login = (req, res) => {
    const {login, mdp} = req.body;
    console.log(login, mdp)
    const uuid = crypto.randomUUID()
    const user = new User(1, uuid, login, mdp, "admin", "USER")
    const tokens = generateTokens(user);
    user.setRefreshToken(tokens.refreshToken);
    users.push(user);

    // res.cookie('refreshToken', tokens.refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production'
    // })

    // console.log(res.getHeaders());

    res.json({accessToken: tokens.accessToken});
}

export const products = (req, res) => {
    res.json({product: "coca-cola"})
}

export const checkCard = (req, res) => {
    const {dataNFC} = req.body
    const regex = /^([0-9A-Fa-f]{2}:){6}[0-9A-Fa-f]{2}$/
    if (regex.test(dataNFC)) {
        res.status(200).json({message: 'Valid card number'});
    } else {
        res.status(401).json({message: 'Invalid card number'});
    }
}