// ExerciseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Compiler from './compiler';
import '../css/ExerciseDetail.css';
import DashboardNavbar from './dashboardNavbar';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../css/backButton.css';

const ExerciseDetail = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({ username: '' });
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        
        navigate('/dashboard');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            console.log('Fetching user data...');

            if (token) {
                try {
                    const response = await api.get('/api/user/', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('Fetched user data:', response.data);
                    setUserData(response.data);
                } catch (error) {
                    console.error("There was an error fetching the user data!", error);
                }
            } else {
                console.error("No token found");
            }
        };

        fetchUserData();
    }, []);

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
        <div>
            <DashboardNavbar />
            <button onClick={handleBackToDashboard} className="back-button">Back</button>
            <div className='exercise-detail'>
                
                <div className='exercise-detail-left'>
                    <Compiler testType="exercise" testId={id} username={userData.username}/>
                </div>
                <div className='exercise-detail-right'>
                    <h1>{exercise.title}</h1>
                    <pre>{exercise.question}</pre>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetail;
