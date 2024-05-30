import React from 'react';
import ExerciseList from '../components/ExerciseList';
import FilterBar from '../components/FilterBar';
import '../css/ExerciseSelectionPage.css';

const ExerciseSelectionPage = () => {


    return (
        <div className='container'>
            <ExerciseList />
        </div>
    );
};

export default ExerciseSelectionPage;
