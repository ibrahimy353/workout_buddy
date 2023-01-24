import React, { useState } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch(`${process.env.REACT_APP_DB_URL}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
            console.error(error);
        }
        if (response.ok) {
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            setSuccess(json.message);
            dispatch({ type: 'CREATE_WORKOUT', payload: json.workout })
        }
    };

    return (
        <form className='cretae' onSubmit={handleSubmit}>
            <h3>Add a new workout..!</h3>

            <label>Exercise title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load in kg:</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add workout</button>
            {error && <div className='error'>{error}</div>}
            {success && <div className='success'>{success}</div>}
        </form>
    );
};

export default WorkoutForm;