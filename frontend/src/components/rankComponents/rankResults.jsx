// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../../css/rank/rankDisplay.css'
// import UserRank from './userRank'
// import DashboardNavbar from '../dashboardNavbar';
// import { useNavigate } from 'react-router-dom';
// import '../../css/backButton.css';
// import { ACCESS_TOKEN } from '../../constants';
// import api from '../../api';




// const RankResults = () => {
//     const { id } = useParams();
//     const [challengeResults, setChallengeResults] = useState([]);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState({ username: '' });

//     const handleBackToDashboard = () => {
        
//         navigate('/dashboard');
//     };


    
    

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem(ACCESS_TOKEN);
//             console.log('Fetching user data...');

//             if (token) {
//                 try {
//                     const response = await api.get('/api/user/', {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     console.log('Fetched user data:', response.data);
//                     setUserData(response.data);
//                 } catch (error) {
//                     console.error("There was an error fetching the user data!", error);
//                 }
//             } else {
//                 console.error("No token found");
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         const fetchChallengeResults = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/challenge-results/`);
//                 if (response.data) {
//                     setChallengeResults(response.data.filter(result => result.challenge_id === parseInt(id)));

//                 }
//             } catch (e) {
//                 setError(`Failed to fetch results: ${e.message}`);
//             }
//         };

//         fetchChallengeResults();
//     }, [id]);

   

    

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!challengeResults.length) {
//         return <div><DashboardNavbar /><button onClick={handleBackToDashboard} className="back-button">Back</button><div className="rank-wrapper">No challenger in this challenge.</div></div>;
//     }

    

//     return (
//         <>
//             <DashboardNavbar />
//             <button onClick={handleBackToDashboard} className="back-button">Back</button>
//             <div className="rank-wrapper">
//                 <div className="rank-container">
//                     <div className="leaderboard-rank">
//                         <h1>Leaderboard</h1>
//                     </div>
//                     <div className="your-rank">

//                     <h1>Congrats!</h1>
//                     <br />
//                     <span>
                        
//                         Rank {userData.rank} {userData.username}

                        
//                     </span>
//                     </div>
//                     <div className="rank-label">
//                         <div className="Rank-label">Rank</div>
//                         <div className="Username-label">Username</div>
//                         <div className="Time-finish-label invinsible-font">Time Finished</div>
//                     </div>
//                     <div className="all-rank">
//                         {challengeResults.map(result => (
//                             <UserRank key={result.id} result={result} />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default RankResults;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/rank/rankDisplay.css';
import UserRank from './userRank';
import DashboardNavbar from '../dashboardNavbar';
import { useNavigate } from 'react-router-dom';
import '../../css/backButton.css';
import { ACCESS_TOKEN } from '../../constants';

const RankResults = () => {
    const { id } = useParams();
    const [challengeResults, setChallengeResults] = useState([]);
    const [userRank, setUserRank] = useState(null);
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

        const fetchUserRank = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                const response = await axios.get(`http://localhost:8000/api/user-challenge-rank/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserRank(response.data);
            } catch (e) {
                if (e.response && e.response.status === 404) {
                    setUserRank(null); // User has not participated
                } else {
                    setError(`Failed to fetch user rank: ${e.message}`);
                }
            }
        };

        fetchChallengeResults();
        fetchUserRank();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challengeResults.length) {
        return (
            <div>
                <DashboardNavbar />
                <button onClick={handleBackToDashboard} className="back-button">Back</button>
                <div className="rank-wrapper">No challenger in this challenge.</div>
            </div>
        );
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
                        {userRank ? (
                            <span><h1>Congrats!</h1><br />Rank #{userRank.rank} {userRank.user} - Finished at {new Date(userRank.finished_time).toLocaleString()}</span>
                        ) : (
                            <span>You have not participated in this challenge</span>
                        )}
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
};

export default RankResults;