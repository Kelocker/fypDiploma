import React from 'react';
import ExerciseList from '../components/ExerciseList';
import FilterBar from '../components/FilterBar';
import '../css/ExerciseSelectionPage.css';

const ExerciseSelectionPage = () => {
    const handleFilterChange = (filterType, value) => {
        // Implement filtering logic or update the API call
        console.log(`Filtering ${filterType} with ${value}`);
    };

    return (
        <div className='container'>
            <ExerciseList />
        </div>
    );
};

export default ExerciseSelectionPage;
