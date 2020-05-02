
const express = require('express');
const router = express.Router();

const MealController = require('../controllers/meal.controller');

router.get('/', MealController.getMeals);
router.get('/:_id', MealController.getMeal);
router.post('/', MealController.addMeals);
router.put('/', MealController.updateMeals);
router.delete('/:_id', MealController.deleteMeals);
router.get('/all/meals', MealController.getAllMeals);

module.exports = router;
