const User = require('../models/User.model')

exports.getUsers = async function (req, res, next) {
    res.status(200).send({msg: "done"});
};
