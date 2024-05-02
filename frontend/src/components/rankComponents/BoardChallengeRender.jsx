import React from 'react'
import '../../css/rank/challengeBoard.css'


import {BoardChallengeCard} from './ChallengeCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BoardChallengeRender = () => {
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