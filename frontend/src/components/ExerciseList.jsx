import React, { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import '../css/ExerciseList.css'; // Make sure this import is correct

const ExerciseList = () => {
    const [exercises, setExercises] = useState([
        { id: 1, title: 'Exercise 1', description: 'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1', difficulty_level: 'Beginner'},
        { id: 2, title: 'Exercise 2', description: 'Description 2', difficulty_level: 'Intermediate'},
        { id: 3, title: 'Exercise 3', description: 'Description 3', difficulty_level: 'Advanced'},
        // Add more exercises as needed
    ]);

    // Comment out the useEffect if you don't want to fetch data from the API
    /*
    useEffect(() => {
        fetch('/api/exercises/')
            .then(response => response.json())
            .then(data => setExercises(data))
            .catch(error => console.error('Error fetching exercises:', error));
    }, []);
    */

    const handleSelectExercise = (exercise) => {
        // Navigate to exercise detail page
        window.location.href = `/exercise-detail/${exercise.id}`;
    };

    return (
        <div className='list-container'>
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} onSelect={handleSelectExercise} />
            ))}
        </div>
    );
};

export default ExerciseList;
