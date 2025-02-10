import {Router} from 'express';
import {getNewAccessToken, login, logout, verifyBalance} from '../controllers/react.js';
import {authenticateJWT} from "../middleware/authMiddleware.js";

const routerReact = Router();

routerReact.post('/login', login);
routerReact.get('/logout', logout);
routerReact.get('/refreshToken', getNewAccessToken);
routerReact.get('/verifyBalance', authenticateJWT, verifyBalance);

export default routerReact;