import React, { useState, useEffect } from 'react';
import '../../css/rank/Challenge.css';
import { BoardChallengeCard } from './ChallengeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import api from '../api';
import { ACCESS_TOKEN } from '../../constants';

// const Challenge = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem(ACCESS_TOKEN); 
    
//     useEffect(() => {
//       const fetchUserData = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN); 
//         console.log('Fetching user data...');
  
//         if (token) {
//           try {
//             const response = await api.get('/api/user/', { 
//               headers: {
//                 'Authorization': `Bearer ${token}`
//               }
//             });
//             console.log('Fetched user data:', response.data);
//             username = {userData.username};
//           } catch (error) {
//             console.error("There was an error fetching the user data!", error);
//           }
//         } else {
//           console.error("No token found");
//         }
//       };
  
//       fetchUserData();
//     }, []);

//     useEffect(() => {
//       const fetchChallengeResults = async () => {
//           try {
//               const response = await axios.get(`http://localhost:8000/api/challenge-results/`);
//               if (response.data) {
//                   setChallengeResults(response.data.filter(result => result.challenge_id === parseInt(id)));

//               }
//           } catch (e) {
//               setError(`Failed to fetch results: ${e.message}`);
//           }
//       };

//       fetchChallengeResults();
//   }, [id]);

 

  

//   if (error) {
//       return <div>Error: {error}</div>;
//   }

//   if (!challengeResults.length) {
//       return <div>No results found for this challenge.</div>;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = `http://localhost:8000/api/challenges/`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setChallenges(data);
//       } catch (e) {
//         setError(e.message);
//         console.error(e);
//       }
//     };

//     fetchData();
//   }, []);

// const handleSelectChallenge = (challenge) => {
//   const today = new Date();
//   const endDate = new Date(challenge.end_time);
//   if (username) { // Assuming 'username' is defined somewhere in your code
//     if (endDate > today) {
//       // If the challenge's end date is in the future, navigate to the challenge detail page
//       window.location.href = `/challenge-detail/${challenge.id}`;
//     } else {
//       // If the challenge has ended, navigate to the rank results page
//       window.location.href = `/rank-results/${challenge.id}`;
//     }
//   } else {
//     // If there is no username, navigate to the rank countdown page
//     window.location.href = `/rank-countdown/${challenge.id}`;
//   }
// };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
  

//   return (
//     <div className="Challenge-display">
//       <div className="swiper_container">
//         <Swiper
//           effect={'coverflow'}
//           grabCursor={true}
//           spaceBetween={10}
//           loop={true}
//           slidesPerView={3}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           pagination={{ el: '.swiper-pagination', clickable: true }}
//           navigation={{
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//             clickable: true,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//               spaceBetween: 10,
//             },
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 30,
//             },
//           }}
//         >
//           {challenges.map((challenge) => (
//             <SwiperSlide key={challenge.id}>
//               <BoardChallengeCard challenge={challenge} onSelect={handleSelectChallenge} />
//             </SwiperSlide>
//           ))}

//           <div className="slider-controler">
//             <div className="swiper-button-prev slider-arrow"></div>
//             <div className="swiper-button-next slider-arrow"></div>
//             <div className="swiper-pagination"></div>
//           </div>
//         </Swiper>
//       </div>

//       <div className="Other-challenge">
//         {challenges.map((challenge) => (
//           <BoardChallengeCard key={challenge.id} challenge={challenge} onSelect={handleSelectChallenge} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Challenge;



import axios from 'axios';


const Challenge = () => {
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("Debug: No access token found.");
                setError("Authentication error: No token found");
                return;
            }

            try {
                console.log("Debug: Fetching user data with token.");
                const userResponse = await axios.get('http://localhost:8000/api/user-details/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("Debug: User data fetched", userResponse.data);
                setUsername(userResponse.data.username);
                fetchChallenges(userResponse.data.username, token);
            } catch (error) {
                console.error("Debug: Error fetching user data", error);
                setError("Failed to load user data");
            }
        };

        fetchUserData();
    }, []);

    const fetchChallenges = async (username, token) => {
        try {
            console.log("Debug: Fetching challenges for user", username);
            const challengesResponse = await axios.get('http://localhost:8000/api/challenges/');
            const challengesWithAttempts = await Promise.all(challengesResponse.data.map(async (challenge) => {
                try {
                    console.log("Debug: Checking challenge attempt for", challenge.id);
                    const attemptResponse = await axios.get(`http://localhost:8000/api/check-attempt/${username}/${challenge.id}/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    return { ...challenge, has_attempted: attemptResponse.data.has_attempted };
                } catch (error) {
                    console.error("Debug: Error checking challenge attempt for", challenge.id, error);
                    return { ...challenge, has_attempted: false };
                }
            }));

            setChallenges(challengesWithAttempts);
            console.log("Debug: Challenges fetched with attempt data", challengesWithAttempts);
        } catch (error) {
            console.error("Debug: Failed to fetch challenges", error);
            setError("Failed to load challenges");
        }
    };

    const handleSelectChallenge = (challenge) => {
        const today = new Date();
        const endDate = new Date(challenge.end_time);
        console.log("Debug: Selecting challenge", challenge.id, "Attempted:", challenge.has_attempted, "End date:", endDate);

        if (endDate > today && challenge.has_attempted) {
            window.location.href = `/rank-countdown/${challenge.id}`;
            // alert("You have attemp");
        } else if (endDate > today) {
            window.location.href = `/challenge-detail/${challenge.id}`;
        } else {
            window.location.href = `/rank-results/${challenge.id}`;
        }
    };

    if (error) {
        console.error("Debug: Rendering with error", error);
        return <div>Error: {error}</div>;
    }

    return (
        <div className="Challenge-display">
            <div className="swiper_container">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    spaceBetween={10}
                    loop={true}
                    slidesPerView={3}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {challenges.map((challenge) => (
                        <SwiperSlide key={challenge.id}>
                            <BoardChallengeCard challenge={challenge} onSelect={handleSelectChallenge} />
                        </SwiperSlide>
                    ))}

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow"></div>
                        <div className="swiper-button-next slider-arrow"></div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>

            <div className="Other-challenge">
                {challenges.map((challenge) => (
                    <BoardChallengeCard key={challenge.id} challenge={challenge} onSelect={handleSelectChallenge} />
                ))}
            </div>
        </div>
    );
};

export default Challenge;
