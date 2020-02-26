//required variables/constants
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//configures to allow environmental variables in .env files
require('dotenv').config();

//creates express server
const app = express();
const port = process.env.PORT || 5000;

//middleware--parses json
app.use(cors());
app.use(express.json());

//connects to mongodb
const uri = process.env.ATLAS_URI;
    //required due to mongodb deprecation index function
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
    //once connection is open, log success
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully")
});

//tells server to use routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts server
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});