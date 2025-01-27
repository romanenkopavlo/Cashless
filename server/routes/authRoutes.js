import {Router} from 'express';
import {getNewAccessToken, login} from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/refreshToken', getNewAccessToken);

export default router;