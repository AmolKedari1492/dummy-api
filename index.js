const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/User.model');

// User session added
app.use(session({
    name: 'healthapp',
    secret: 'healthapp',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6 * 60 * 60 * 1000 }
}));

// App body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.raw({ limit: '5mb' }));

// Check for authenticate user
const isAuthenticate = (req, res, next) => {
    if (req.session && req.session.user_id) {
        return next();
    }
    return res.status(401).send({ message: "Not a valid user." });
};

// App routes
const userRouter = require("./routes/users.routes");
const mealRouter = require("./routes/meals.routes");

app.use('/users', isAuthenticate, userRouter);
app.use('/meals', isAuthenticate, mealRouter);

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
    return res.status(200).send("Health tracking app");
});

// Listen to the port
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    User.findOne({
        email, password
    },
        (error, user) => {
            if (error) {
                return res.status(404).send({ message: "user not found" })
            }

            if (!user) {
                return res.status(404).send({ message: "user not found" })
            }

            let endUser = {
                name: user.name,
                email: user.email,
                admin: user.admin,
                monthlyTarget: user.monthlyTarget
            };

            req.session.email = user.email;
            req.session.admin = user.admin;
            req.session.user_id = user._id;
            return res.send(endUser);
        }
    )
});

app.get('/logout', (req, res) => {
    req.session.email = null;
    req.session.admin = null;
    req.session.user_id = null;
    return res.send({ message: "success" });
});

