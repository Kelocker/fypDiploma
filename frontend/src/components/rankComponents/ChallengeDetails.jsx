// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import Compiler from '../compiler';
// // import DashboardNavbar from '../dashboardNavbar';
// // import '../../css/ExerciseDetail.css';
// // import { ACCESS_TOKEN } from '../../constants';
// // import api from '../../api';

// // const ChallengeDetails = () => {
// //     const { id } = useParams();
// //     const [challenge, setChallenge] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [userData, setUserData] = useState({ username: '' });

// //     useEffect(() => {
// //         const fetchChallenge = async () => {
// //             try {
// //                 const response = await axios.get(`http://localhost:8000/api/challenges/`);
// //                 const challenge = response.data.find((challenge) => challenge.id === parseInt(id));
// //                 setChallenge(challenge);
// //                 console.log(challenge);
// //             } catch (e) {
// //                 setError(e.message);
// //             }
// //         };

// //         fetchChallenge();
// //     }, [id]);

// //     useEffect(() => {
// //         const fetchUserData = async () => {
// //             const token = localStorage.getItem(ACCESS_TOKEN);
// //             console.log('Fetching user data...');

// //             if (token) {
// //                 try {
// //                     const response = await api.get('/api/user/', {
// //                         headers: {
// //                             'Authorization': `Bearer ${token}`
// //                         }
// //                     });
// //                     console.log('Fetched user data:', response.data);
// //                     setUserData(response.data);
// //                 } catch (error) {
// //                     console.error("There was an error fetching the user data!", error);
// //                 }
// //             } else {
// //                 console.error("No token found");
// //             }
// //         };

// //         fetchUserData();
// //     }, []);

// //     if (error) {
// //         return <div>Error: {error}</div>;
// //     }

// //     if (!challenge) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <>
// //             <DashboardNavbar />
// //             Good Luck, {userData.username}!
// //             <div className='exercise-detail'>
// //                 <div className='exercise-detail-left'>
// //                     <Compiler testType="challenge" testId={id} />
// //                 </div>
// //                 <div className='exercise-detail-right'>
// //                     <h1>{challenge.title}</h1>
// //                     <pre>{challenge.question}</pre>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default ChallengeDetails;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Compiler from '../compiler';
import DashboardNavbar from '../dashboardNavbar';
import '../../css/ExerciseDetail.css';
import { ACCESS_TOKEN } from '../../constants';
import api from '../../api';

const ChallengeDetails = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({ username: '' });

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!challenge) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DashboardNavbar />
            Good Luck, {userData.username}!
            <div className='exercise-detail'>
                <div className='exercise-detail-left'>
                    <Compiler testType="challenge" testId={id} username={userData.username} />
                </div>
                <div className='exercise-detail-right'>
                    <h1>{challenge.title}</h1>
                    <pre>{challenge.question}</pre>
                </div>
            </div>
        </>
    );
};

export default ChallengeDetails;
