import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/rank/rankDisplay.css'
import UserRank from './userRank'
import DashboardNavbar from '../dashboardNavbar';
import { useNavigate } from 'react-router-dom';
import '../../css/backButton.css';



const RankResults = () => {
    const { id } = useParams();
    const [challengeResults, setChallengeResults] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        
        navigate('/dashboard');
    };


    

    useEffect(() => {
        const fetchChallengeResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/challenge-results/`);
                if (response.data) {
                    setChallengeResults(response.data.filter(result => result.challenge_id === parseInt(id)));

                }
            } catch (e) {
                setError(`Failed to fetch results: ${e.message}`);
            }
        };

        fetchChallengeResults();
    }, [id]);

   

    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challengeResults.length) {
        return <div><DashboardNavbar /><button onClick={handleBackToDashboard} className="back-button">Back</button><div className="rank-wrapper">No challenger in this challenge.</div></div>;
    }

    

    return (
        <>
            <DashboardNavbar />
            <button onClick={handleBackToDashboard} className="back-button">Back</button>
            <div className="rank-wrapper">
                <div className="rank-container">
                    <div className="leaderboard-rank">
                        <h1>Leaderboard</h1>
                    </div>
                    <div className="your-rank">

                    <h1>Congrats!</h1>
                    <br />
                    <span>
                        
                        Rank #21 Coolest User

                        
                    </span>
                    </div>
                    <div className="rank-label">
                        <div className="Rank-label">Rank</div>
                        <div className="Username-label">Username</div>
                        <div className="Time-finish-label">Time Finished</div>
                    </div>
                    <div className="all-rank">
                        {challengeResults.map(result => (
                            <UserRank key={result.id} result={result} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RankResults;
