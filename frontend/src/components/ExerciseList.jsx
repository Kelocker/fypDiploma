import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import '../css/ExerciseList.css'; 

const ExerciseList = () => {
    const [exercises, setExercises] = useState([
    ]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define an async function within the useEffect
        const fetchData = async () => {
            try {
                // Await the fetch call and response transformation
                const response = await fetch('http://localhost:8000/api/exercises/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-2xx responses
                }
                const data = await response.json();
                setExercises(data); // Set the data in state
            } catch (e) {
                setError(e.message); // Catch any errors and set an error state
                console.log(e); // Log the error as well
            }
        };

        fetchData(); // Call the async function
    }, []); // The empty array ensures this effect runs only once on mount

    if (error) {
        return <div>Error: {error}</div>; // Render error message if there is an error
    }


    const handleSelectExercise = (exercise) => {
        // Navigate to exercise detail page
        window.location.href = `/exercise-detail/${exercise.id}`;
    };

    

    return (
        /* console the data fetched from the backend */

        <div className='list-container'>
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} onSelect={handleSelectExercise} />
            ))}
        </div>
    );
};

export default ExerciseList;
