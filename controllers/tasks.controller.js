const Task = require('../models/Task.model');
const TaskMaster = require('../models/TaskMasters.model');

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
            message: "Task name is emoty."
        }
    }

    if(!obj.status) {
        return {
            error: true,
            message: "Task status is emoty."
        }
    }

    return {
        error: false
    };
};

// Get all Tasks list
const getTasks = (req, res, next) => {
    Task.find({}, (err, Tasks) => {
        if (err) {
            return res.status(404).send({ message: 'Records not found.' });
        }
        return res.status(200).send({ Tasks });
    });
};

// Get Task by id
const getTask = (req, res, next) => {
    let { _id } = req.params;

    Task.findOne({ _id }, (err, Task) => {
        if (err) {
            return res.status(404).send({ message: 'A record not found.' });
        }
        return res.status(200).send({ Task });
    });
};

// Create a new Task
const addTasks = (req, res, next) => {
    let {
        name,
        status
    } = req.body;

    let data = {
        name,
        status
    };

    let checkIfValid = isValid(data);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    let TaskOBj = new Task({
        ...data,
        created_at: getCurrDate(),
        updated_at: getCurrDate()
    });

    TaskOBj.save((err, Task) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to create a Task' });
        }
        return res.status(200).send({ Task });
    });
};

// Update a Task by id
const updateTasks = (req, res, next) => {
    let Task = req.body;
    Task.updated_at = getCurrDate();
    Task.created_at = getCurrDate();
    
    let checkIfValid = isValid(Task);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    Task.updateOne({ _id: Task._id },
        {
            $set: {
                name: Task.name,
                updated_at: Task.updated_at
            }
        },
        (err, Task) => {
            if (err) {
                return res.status(404).send({ message: 'Failed to update a Task' });
            }
            return res.status(200).send({ Task });
        });
};

// Delete a Task
const deleteTasks = (req, res, next) => {
    let { _id } = req.params;

    Task.findOneAndRemove({ _id }, (err, Task) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to delete a Task' });
        }
        return res.status(200).send({});
    });
};

const getMaster = (req, res, next) => {
    console.log(130)
    TaskMaster.find({}, (err, TaskMaster) => {
        console.log(err, TaskMaster)
        if (err) {
            return res.status(404).send({ message: err });
        }
        return res.status(200).send({ TaskMaster });
    });
};

const createMaster = (req, res, next) => {
    let {
        name
    } = req.body;

    let data = {
        name
    };

    let TaskMasterObj = new TaskMaster({
        ...data,
        created_at: getCurrDate(),
        updated_at: getCurrDate()
    });

    TaskMasterObj.save((err, Task) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to create a Task' });
        }
        return res.status(200).send({ Task });
    });
};

const deleteMaster = (req, res, next) => {
    let { _id } = req.params;

    TaskMaster.findOneAndRemove({ _id }, (err, Task) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to delete a Task' });
        }
        return res.status(200).send({});
    });
};

module.exports = {
    getTask,
    getTasks,
    addTasks,
    updateTasks,
    deleteTasks,
    getMaster,
    createMaster,
    deleteMaster
}