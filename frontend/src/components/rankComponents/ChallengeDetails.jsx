// ChallengeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Compiler from '../compiler';
import DashboardNavbar from '../dashboardNavbar';
// import '../css/ExerciseDetail.css';


const ChallengeDetails = () => {
  
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/challenges/`);
                const challenge = response.data.find((challenge) => challenge.id === parseInt(id));
                setChallenge(challenge);
                console.log(challenge);
            } catch (e) {
                setError(e.message);
            }
        };

        fetchChallenge();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challenge) {
        return <div>Loading...</div>;
    }

    return (
      <>
        <DashboardNavbar />
        <div className='challenge-detail'>
            <div className='challenge-detail-left'>
                <Compiler testType="challenge" testId={id} />
            </div>
            <div className='exercise-detail-right'>
                <h1>{challenge.title}</h1>
                <pre>{challenge.question}</pre>
            </div>
        </div>
      </>
    );
};



export default ChallengeDetails
