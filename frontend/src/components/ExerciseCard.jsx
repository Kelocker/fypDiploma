import React from 'react';
import '../css/ExerciseCard.css'; // Make sure this import is correct

const ExerciseCard = ({ exercise, onSelect }) => {
    const difficulty = exercise.difficulty_level.toLowerCase();
    return (
        <div className="card" onClick={() => onSelect(exercise)}>
            <h3>{exercise.title}</h3>
            <span className={`difficulty-badge ${difficulty}`}>
                {exercise.difficulty_level}
            </span>
            <p>{exercise.description}</p>
        </div>
    );
};

export default ExerciseCard;