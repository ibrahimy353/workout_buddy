const mongoose = require('mongoose');

const Workout = require('../models/workout_model');

const createWorkout = async (req, res) => {

    const { title, load, reps } = req.body;

    try {
        let response = await Workout.create(
            {
                title, load, reps
            }
        );

        return res.status(200).json({
            status: 200,
            workout: response,
            message: 'Success'
        });
    } catch (error) {
        console.error(`Error at createWorkout -> ${error.message}`);
        
        return res.status(400).json({
            status: 400,
            workout: {},
            message: error.message
        });
    }
};

const getWorkouts = async (req, res) => {

    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            status: 200,
            workouts: workouts,
            message: 'Success'
        });
    } catch (error) {
        console.error(`Error at getWorkouts -> ${error.message}`);
        
        return res.status(400).json({
            status: 400,
            workouts: [],
            message: error.message
        });
    }
};

const getWorkout = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: 'Invalid workout id',
                workout: {}
            });
        }

        let workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({
                status: 404,
                message: 'No workout found',
                workout: {}
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            workout: workout
        });

    } catch (error) {
        console.error(`Error at getWorkout -> ${error.message}`);
        
        return res.status(400).json({
            status: 400,
            workout: {},
            message: error.message
        });
    }
};

const updateWorkout = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: 'Invalid workout id',
                workout: {}
            });
        }

        let workout = await Workout.findByIdAndUpdate({_id: id}, req.body);

        if (!workout) {
            return res.status(404).json({
                status: 404,
                message: 'No workout found',
                workout: {}
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            workout: workout
        });

    } catch (error) {
        console.error(`Error at updateWorkout -> ${error.message}`);
        
        return res.status(400).json({
            status: 400,
            workout: {},
            message: error.message
        });
    }
};

const deleteWorkout = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: 'Invalid workout id',
                workout: {}
            });
        }

        let workout = await Workout.findByIdAndDelete({_id: id});

        if (!workout) {
            return res.status(404).json({
                status: 404,
                message: 'No workout found',
                workout: {}
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Success',
            workout: workout
        });

    } catch (error) {
        console.error(`Error at deleteWorkout -> ${error.message}`);
        
        return res.status(400).json({
            status: 400,
            workout: {},
            message: error.message
        });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
};