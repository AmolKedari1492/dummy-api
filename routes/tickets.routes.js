
const express = require('express');
const router = express.Router();

const TicketController = require('../controllers/ticket.controller');

// Ticket CRUD API
router.get('/', TicketController.getTickets);
router.get('/:_id', TicketController.getTicket);
router.post('/', TicketController.addTicket);
router.put('/', TicketController.updateTicket);
router.delete('/:_id', TicketController.deleteTicket);

module.exports = router;
