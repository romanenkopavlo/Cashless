import {Router} from 'express';
import {login} from '../controllers/android.js';
const routerAndroid = Router();

routerAndroid.post('/loginAd', login)

// routerAndroid.post('/loginUs')

export default routerAndroid;