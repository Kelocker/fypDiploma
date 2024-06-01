    // ExerciseList.jsx
    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import ExerciseCard from './ExerciseCard';
    import FilterBar from './FilterBar';
    import '../css/ExerciseList.css'; 

    const ExerciseList = () => {
        const [exercises, setExercises] = useState([]);
        const [error, setError] = useState(null);
        const [selectedDifficulty, setSelectedDifficulty] = useState('');
        const navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                try {
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
        }, [selectedDifficulty]);

        if (error) {
            return <div>Error: {error}</div>;
        }

        const handleSelectExercise = (exercise) => {
            navigate(`/exercise-detail/${exercise.id}`);
        };

        const handleFilterChange = (difficulty) => {
            setSelectedDifficulty(difficulty);
        };

        return (
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
