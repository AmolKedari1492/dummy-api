const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
// Check for authenticate user
const isAuthenticate = (req, res, next) => {
    if (req.session && req.session.user_id) {
        return next();
    }
    return res.status(401).send({ message: "Not a valid user." });
};

router.get('/', isAuthenticate, UserController.getUsers);
router.get('/:_id', UserController.getUser);
router.post('/', isAuthenticate, UserController.createUser);
router.put('/', isAuthenticate, UserController.updateUser);
router.delete('/:_id', isAuthenticate, UserController.deleteUser);
router.put('/change-password/', UserController.resetpassowrd);

module.exports = router;
