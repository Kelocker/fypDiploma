import React, { useState, useEffect } from 'react'
import '../../css/rank/challengeBoard.css'


import {BoardChallengeCard} from './ChallengeCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BoardChallengeRender = () => {

  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Adjust the URL based on the selected difficulty
            const url = `http://localhost:8000/api/challenges/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setChallenges(data);
        } catch (e) {
            setError(e.message);
            console.error(e);
        }
    };

    fetchData();
}, ); // Depend on selectedDifficulty to re-fetch when it changes

  const handleSelectExercise = (exercise) => {
    // Navigate to exercise detail page
    window.location.href = `/exercise-detail/${exercise.id}`;
  };

  return (
    <Swiper
     
    effect={'coverflow'}
        grabCursor={true}
        spaceBetween={50}
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
        className="swiper_container"
    >
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>
      <SwiperSlide><BoardChallengeCard /></SwiperSlide>

      {challenges.map(challenge => (
          <BoardChallengeCard key={challenge.id} exercise={challenge} onSelect={handleSelectExercise} />
      ))}

      <div className="slider-controler">

          <div className="swiper-button-prev slider-arrow">
            
          </div>

          <div className="swiper-button-next slider-arrow">
         
          </div>

          <div className="swiper-pagination"></div>
        </div>

    
      
    </Swiper>
  )
}

export default BoardChallengeRender