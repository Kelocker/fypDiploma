import React from 'react';
import '../css/HomePage.css';
import python from '../assets/img/python.png';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-section">
        <h2>Welcome to SOYA!</h2>
        <p>Are you ready to be exposed to an entirely different way of learning the Python Programming Language?</p>
        <p>If so! Go ahead and click that login button located on the top right of the page and register an account now!</p>
      </div>
      <img src={python} alt="Decorative" className="corner-image" />

    </div>
  );
}

export default HomePage;


