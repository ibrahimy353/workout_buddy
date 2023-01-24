import { useEffect } from "react";

import WorkoutDetails from '../components/workoutDetails';
import WorkoutForm from '../components/workoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutContext';

const Home = () => {

    console.log(useWorkoutsContext());

    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_DB_URL}/api/workouts`);
            const json = await response.json();
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json.workouts})
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    console.log(workouts);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((w) => (
                    <WorkoutDetails key={w._id} workout={w} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;