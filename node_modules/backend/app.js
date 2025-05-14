import express from 'express';
import { initDB } from './models/index.js';

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => res.json({ msg: 'pong' }));

initDB()
    .then(() => app.listen(4000, () => console.log('API @ http://localhost:4000')))
    .catch(console.error);
