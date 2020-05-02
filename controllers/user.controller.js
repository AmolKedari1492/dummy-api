const User = require('../models/User.model')

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkIfPasswordEmpty = (data) => {
    if (!data.password) {
        return {
            error: true,
            message: "Password cannot be empty."
        };
    }

    return {
        error: false
    };
};

const isDataValid = (data) => {
    if (!data.name) {
        return {
            error: true,
            message: "Name is empty."
        };
    }

    if (!data.email) {
        return {
            error: true,
            message: "Email is empty."
        };
    }

    if (!validateEmail(data.email)) {
        return {
            error: true,
            message: "Email is invalid."
        };
    }

    if (!data.monthlyTarget) {
        return {
            error: true,
            message: "Target is empty."
        };
    }

    if (data.monthlyTarget < 0) {
        return {
            error: true,
            message: "Target cannot be zero."
        };
    }

    return {
        error: false
    };
};

const getUsers = (req, res, next) => {
    User.find({},
        { name: 1, email: 1, admin: 1, monthlyTarget: 1 },
        (error, users) => {
            if (error) {
                return res.status(404).send({ message: "Records not found" })
            }
            return res.send(users);
        });
};

const getUser = (req, res, next) => {
    let { _id } = req.params;
    User.findOne({ _id },
        { name: 1, email: 1, admin: 1, monthlyTarget: 1 },
        (error, user) => {
            if (error) {
                return res.status(404).send({ message: "user not found" })
            }
            return res.send(user);
        });
};

const createUser = (req, res, next) => {
    let { body } = req;

    let checkValid = isDataValid(body);

    if (checkValid.error) {
        return res.status(403).send({ error: checkValid });
    }

    checkValid = checkIfPasswordEmpty(body);
    if (checkValid.error) {
        return res.status(403).send({ error: checkValid });
    }

    body.admin = body.admin || false;
    body.created_at = new Date();
    body.updated_at = new Date();

    let user = new User(body);
    user.save((error, response) => {
        if (error) {
            return res.status(404).send({ message: "user not created" })
        }

        let userBody = {
            name: response.name,
            email: response.email,
            admin: response.admin,
            monthlyTarget: response.monthlyTarget
        };

        return res.send({ user: response });
    });
};

const updateUser = (req, res, next) => {
    let { body } = req;

    let checkValid = isDataValid(body);

    if (checkValid.error) {
        return res.status(403).send({ error: checkValid });
    }

    body.updated_at = new Date();

    User.updateOne({
        _id: body._id
    },
        {
            $set: {
                name: body.name,
                email: body.email,
                admin: body.admin,
                monthlyTarget: body.monthlyTarget,
                updated_at: body.updated_at
            }
        },
        (error, user) => {
            if (error) {
                return res.status(404).send({ message: "user not found" })
            }
            return res.send(body);
        }
    )
};

const deleteUser = (req, res, next) => {
    let { _id } = req.params;
    User.findOneAndRemove({ _id },
        (error, user) => {
            if (error) {
                return res.status(404).send({ message: "user not deleted" })
            }
            return res.send({ message: "success" });
        });
};

const resetpassowrd = (req, res, next) => {
    let { body } = req;

    let checkValid = checkIfPasswordEmpty(body);

    if (checkValid.error) {
        return res.status(403).send({ error: checkValid });
    }

    body.updated_at = new Date();

    User.updateOne({
        _id: body._id
    },
        {
            $set: {
                password: body.password,
                updated_at: body.updated_at
            }
        },
        (error, user) => {
            if (error) {
                return res.status(404).send({ message: "user not found" })
            }
            return res.send(body);
        }
    )
};


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    resetpassowrd
};