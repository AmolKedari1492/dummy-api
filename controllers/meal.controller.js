const Meal = require('../models/Meal.model');

const getMeals = (req, res, next) => {
    let { user_id } = req.params;

    Meal.find({ user_id }, (err, meals) => {
        if (err) {
            return res.status(404).send({ message: 'Records not found.' });
        }
        return res.status(200).send({ meals });
    });
};

const getMeal = (req, res, next) => {
    let { _id } = req.params;

    Meal.findOne({ _id }, (err, meal) => {
        if (err) {
            return res.status(404).send({ message: 'Record not found.' });
        }
        return res.status(200).send({ meal });
    });
};

const addMeals = (req, res, next) => {
    let {
        name,
        calories,
        userId
    } = req.body;

    let meal = new Meal({
        name,
        calories,
        userId,
        created_at: new Date(),
        updated_at: new Date()
    });

    meal.save((err, meal) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to create a meal' });
        }
        return res.status(200).send({ meal });
    });
};

const updateMeals = (req, res, next) => {
    let meal = req.body;
    meal.updated_at = new Date();
    
    Meal.update({ _id: meal._id },
        meal,
        (err, meal) => {
            if (err) {
                return res.status(404).send({ message: 'Failed to update a meal' });
            }
            return res.status(200).send({ meal });
        });
};

const deleteMeals = (req, res, next) => {
    let { _id } = req.params;

    Meal.findOneAndRemove({ _id }, (err, meal) => {
        if (err) {
            return res.status(404).send({ message: 'Failed to delete a meal' });
        }
        return res.status(200).send({});
    });
};

const getAllMeals = (req, res, next) => {
    let {query} = req;
    let filterQuery = {};
    
    if(query.user_id) {
        filterQuery.user_id = user_id;
    }

    if(query.from && query.to) {
        filterQuery.created_on = {"$gte": query.from, "$lt": query.to};
    }

    Meal.find(query, (err, meals) => {
        if (err) {
            return res.status(404).send({ message: 'Records by filtering not found.' });
        }
        return res.status(200).send({ meals });
    });
};

module.exports = {
    getMeal,
    getMeals,
    addMeals,
    updateMeals,
    deleteMeals,
    getAllMeals
}