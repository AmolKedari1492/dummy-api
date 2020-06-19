
const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/tasks.controller');

// Task Task API
router.get('/', TaskController.getTasks);
router.get('/:_id', TaskController.getTask);
router.post('/', TaskController.addTasks);
router.put('/', TaskController.updateTasks);
router.delete('/:_id', TaskController.deleteTasks);
router.get('/master/list', TaskController.getMaster);
router.post('/master/', TaskController.createMaster);
router.delete('/master/:_id', TaskController.deleteMaster);

module.exports = router;
