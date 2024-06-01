// ExerciseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Compiler from './compiler';
import '../css/ExerciseDetail.css';

const ExerciseDetail = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/exercises/`);
                const exercise = response.data.find((exercise) => exercise.id === parseInt(id));
                setExercise(exercise);
                console.log(exercise);
            } catch (e) {
                setError(e.message);
            }
        };

        fetchExercise();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!exercise) {
        return <div>Loading...</div>;
    }

    return (
        <div className='exercise-detail'>
            <div className='exercise-detail-left'>
                <Compiler testType="exercise" testId={id} />
            </div>
            <div className='exercise-detail-right'>
                <h1>{exercise.title}</h1>
                <p>{exercise.description}</p>
            </div>
        </div>
    );
};

export default ExerciseDetail;
