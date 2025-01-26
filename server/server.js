import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import router from './routes/authRoutes.js';
import {authenticateJWT} from './middleware/authMiddleware.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);

app.get('/', (req, res) => {
    res.json({message: 'Cashless'})
})

app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
});

app.listen(port, () => {
    console.log(`Lancé sur le http://localhost:${port}`);
});