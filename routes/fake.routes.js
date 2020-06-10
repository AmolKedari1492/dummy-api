
const express = require('express');
const router = express.Router();

const TicketController = require('../controllers/fake.controller');

// Ticket CRUD API
router.get('/airlines', TicketController.getAirlines);

module.exports = router;
