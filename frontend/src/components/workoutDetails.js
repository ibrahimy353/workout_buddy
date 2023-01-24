import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';

const WorkoutDetails = ({ workout }) => {

    let localDateString = new Date(Date.parse(workout.createdAt)).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    let now = new Date(localDateString);
    let dateString = now.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });

    const { dispatch } = useWorkoutsContext();

    const handleDelete = async () => {

        const response = await fetch(`${process.env.REACT_APP_DB_URL}/api/workouts/${workout._id}`, {
            method: 'DELETE',
            body: JSON.stringify(workout)
        });

        const json = await response.json();

        if (!response.ok) {
            console.error(json.message);
        }
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json.workout })
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created at: </strong>{dateString}</p>
            <span onClick={handleDelete}>Delete</span>
        </div>
    );
};

export default WorkoutDetails;