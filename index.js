const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || "8000";

// App body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })); 
app.use(bodyParser.json({limit: '5mb'})); 
app.use(bodyParser.raw({limit: '5mb'}) );

// App routes
const userRouter = require("./routes/users.routes");
const mealRouter = require("./routes/meals.routes");

app.use('/users', userRouter);
app.use('/meals', mealRouter);

// Connect to database
const url = "mongodb://admin:a123456@ds161164.mlab.com:61164/heroku_rbw8gljj";

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.on("error", err => {
    console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
});

// Base router
app.get("/", (req, res) => {
    res.status(200).send("Health tracking app");
});

// Listen to the port
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});