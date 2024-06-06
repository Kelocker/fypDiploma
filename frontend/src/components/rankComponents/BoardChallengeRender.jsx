// import React, { useState, useEffect } from 'react';
// import '../../css/rank/challengeBoard.css';
// import { BoardChallengeCard } from './ChallengeCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// const BoardChallengeRender = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [error, setError] = useState(null);

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

//   const today = new Date();
//   const handleSelectChallenge = (challenge) => {
//   if(challenge.end_date < today) {
//     // Navigate to challenge detail page if the challenge is not yet ended
//     window.location.href = `/challenge-detail/${challenge.id}`;
//   } else {
//     // Navigate to rank results if the challenge has ended
//     window.location.href = `/rank-results/${challenge.id}`;
//   }
// };

//   return (
//     <Swiper
//       effect={'coverflow'}
//       grabCursor={true}
//       spaceBetween={50}
//       loop={true}
//       slidesPerView={3}
//       autoplay={{
//         delay: 2500,
//         disableOnInteraction: false,
//       }}
//       pagination={{ el: '.swiper-pagination', clickable: true }}
//       navigation={{
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//         clickable: true,
//       }}
//       modules={[Autoplay, Pagination, Navigation]}
//       className="swiper_container"
//     >
//       {challenges.map((challenge) => (
//         <SwiperSlide key={challenge.id}>
//           <BoardChallengeCard challenge={challenge} onSelect={handleSelectChallenge} />
//         </SwiperSlide>
//       ))}

//       <div className="slider-controler">
//         <div className="swiper-button-prev slider-arrow"></div>
//         <div className="swiper-button-next slider-arrow"></div>
//         <div className="swiper-pagination"></div>
//       </div>
//     </Swiper>
//   );
// };

// export default BoardChallengeRender;
