import React, { useState, useEffect } from 'react';
import '../../css/rank/Challenge.css';
import { BoardChallengeCard } from './ChallengeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  const handleSelectChallenge = (challenge) => {
    window.location.href = `/challenge-detail/${challenge.id}`;
  };

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
