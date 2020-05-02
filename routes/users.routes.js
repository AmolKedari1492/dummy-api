const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/', UserController.getUsers);
router.get('/:_id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
router.delete('/_id', UserController.deleteUser);
router.put('/change-password/', UserController.resetpassowrd);

module.exports = router;
