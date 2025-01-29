import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import routerReact from './routes/react.js';
import routerAndroid from './routes/android.js';

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', routerReact);
app.use('/api/android', routerAndroid);

app.get('/', (req, res) => {
    res.json({message: 'Cashless'})
});

app.listen(port, () => {
    console.log(`Lancé sur le http://localhost:${port}`);
});