import express from "express";
import {PORT} from "./config.js";
import mongoose from 'mongoose';
import {mongoDBURL} from "./.env";
import TaskRoutes from './routes/TaskRoutes.js';
import cors from 'cors';

//require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
/*app.use(cors(
    {
        origin: 'http://localhost:5555',
        methods: ['POST','UPDATE','DELETE'],
        allowedHeaders : ['Content-type'],
    }
));*/
app.use('/api', TaskRoutes);

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('hello');
});
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
