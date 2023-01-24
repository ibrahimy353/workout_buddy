const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const webApp = express();

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

webApp.use(express.urlencoded({extended: true}));
webApp.use(express.json());
webApp.use(cors({origin: true}));

webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});

const homeRoute = require('./routes/home_route');
const workoutRoute = require('./routes/workouts_route');

webApp.use('/', homeRoute.router);
webApp.use('/api/workouts', workoutRoute.router);

const { MONGO_DB_URL } = process.env;

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        webApp.listen(PORT, () => {
            console.log(`Mongodb connected and Server is running at ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error.');
    });
    