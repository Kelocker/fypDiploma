import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import FilterBar from './FilterBar';
import '../css/ExerciseList.css'; 

const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(''); // State to keep track of selected difficulty

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Adjust the URL based on the selected difficulty
                const url = `http://localhost:8000/api/exercises/${selectedDifficulty ? '?difficulty=' + selectedDifficulty : ''}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setExercises(data);
            } catch (e) {
                setError(e.message);
                console.error(e);
            }
        };

        fetchData();
    }, [selectedDifficulty]); // Depend on selectedDifficulty to re-fetch when it changes

    if (error) {
        return <div>Error: {error}</div>; // Render error message if there is an error
    }


    const handleSelectExercise = (exercise) => {
        // Navigate to exercise detail page
        window.location.href = `/exercise-detail/${exercise.id}`;
    };

    // Update this function to handle difficulty filter change
    const handleFilterChange = (difficulty) => {
        setSelectedDifficulty(difficulty); // Update the selected difficulty
    };

    

    return (
        /* console the data fetched from the backend */
        <>
            <FilterBar currentFilter={selectedDifficulty} setFilter={handleFilterChange} />
            <div className='list-container'>
                {exercises.map(exercise => (
                    <ExerciseCard key={exercise.id} exercise={exercise} onSelect={handleSelectExercise} />
                ))}
            </div>
        </>

    );
};

export default ExerciseList;
