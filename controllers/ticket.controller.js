const Ticket = require('../models/Ticket.model');

// Get date in proper format
const getCurrDate = (customDate) => {
    let d = new Date();
    if(customDate) {
        d = new Date(customDate);
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Validate data
const isValid = (obj) => {
    if(!obj.name) {
        return {
            error: true,
            message: "Ticket name is empty."
        }
    }

    if(!obj.description) {
        return {
            error: true,
            message: "Ticket description is empty."
        }
    }

    return {
        error: false
    };
};

// Get all tickets list
const getTickets = (req, res, next) => {
    Ticket.find({}, (err, tickets) => {
        if (err) {
            return res.status(404).send({ message: 'Records not found.' });
        }
        return res.status(200).send({ tickets });
    });
};

// Get ticket by id
const getTicket = (req, res, next) => {
    let { _id } = req.params;

    Ticket.findOne({ _id }, (err, ticket) => {
        if (err) {
            return res.status(404).send({ message: 'Record not found.' });
        }
        return res.status(200).send({ ticket });
    });
};

// Create a new ticket
const addTicket = (req, res, next) => {
    let {
        name,
        description
    } = req.body;

    let data = {
        name,
        description
    };

    let checkIfValid = isValid(data);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    let ticket = new Ticket({
        ...data,
        created_at: getCurrDate(),
        updated_at: getCurrDate()
    });

    ticket.save((err, ticket) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to create a ticket' });
        }
        return res.status(200).send({ ticket });
    });
};

// Update a ticket by id
const updateTicket = (req, res, next) => {
    let ticket = req.body;
    ticket.updated_at = getCurrDate();
    
    let checkIfValid = isValid(ticket);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    Ticket.updateOne({ _id: ticket._id },
        {
            $set: {
                name: ticket.name,
                updated_at: ticket.updated_at
            }
        },
        (err, ticket) => {
            if (err) {
                return res.status(404).send({ message: 'Failed to update a ticket' });
            }
            return res.status(200).send({ ticket });
        });
};

// Delete a ticket
const deleteTicket = (req, res, next) => {
    let { _id } = req.params;

    Ticket.findOneAndRemove({ _id }, (err, ticket) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to delete a ticket' });
        }
        return res.status(200).send({});
    });
};

module.exports = {
    getTicket,
    getTickets,
    addTicket,
    updateTicket,
    deleteTicket
}