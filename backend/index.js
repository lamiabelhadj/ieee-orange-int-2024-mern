import express from "express";
import {PORT} from "./config.js";
import mongoose from 'mongoose';
import {mongoDBURL} from "./.env";
import TaskRoutes from './routes/TaskRoutes.js';

//require('dotenv').config();
const app = express();

app.use(express.json());
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
