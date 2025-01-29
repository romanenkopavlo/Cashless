import {Router} from 'express';
import {getNewAccessToken, login} from '../controllers/react.js';

const routerReact = Router();

routerReact.post('/login', login);
routerReact.post('/refreshToken', getNewAccessToken);

export default routerReact;