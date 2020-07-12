
const express = require('express');
const router = express.Router();

const FakeAPIController = require('../controllers/fake.controller');

// Ticket CRUD API
router.get('/airlines', FakeAPIController.getAirlines);
router.get('/trueblogs', FakeAPIController.getBlogs);
router.get('/trueblogs/:id', FakeAPIController.getBlog);
router.get('/trueblogs/:id/related', FakeAPIController.getRelatedBlog);

module.exports = router;
