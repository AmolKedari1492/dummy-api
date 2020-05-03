const Meal = require('../models/Meal.model');

const getCurrDate = (customDate) => {
    let d = new Date();
    if(customDate) {
        d = new Date(customDate);
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const isValid = (obj) => {
    if(!obj.user_id) {
        return {
            error: true,
            message: "Invalid user"
        }
    }

    if(!obj.name) {
        return {
            error: true,
            message: "Meal name is emoty."
        }
    }

    if(!obj.calories) {
        return {
            error: true,
            message: "Calory is empty."
        }
    }

    if(obj.calories < 0) {
        return {
            error: true,
            message: "Calory must be greater than 0."
        }
    }

    return {
        error: false
    };
};

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
        user_id
    } = req.body;

    let data = {
        name,
        calories,
        user_id
    };

    let checkIfValid = isValid(data);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    let meal = new Meal({
        ...data,
        created_at: getCurrDate(),
        updated_at: getCurrDate()
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
    meal.updated_at = getCurrDate();
    meal.created_at = getCurrDate();
    
    let checkIfValid = isValid(meal);

    if(checkIfValid.error) {
        res.status(401).send({ error: checkIfValid });
        return;
    }

    Meal.updateOne({ _id: meal._id },
        {
            $set: {
                name: meal.name,
                calories: meal.calories,
                updated_at: meal.updated_at
            }
        },
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
        filterQuery.user_id = query.user_id;
    }

    if(query.from && query.to) {
        filterQuery.created_at = {"$gte": new Date(query.from), "$lt": new Date(query.to)};
    }

    Meal.find(filterQuery, (err, meals) => {
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