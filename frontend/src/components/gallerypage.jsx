import React from 'react';
import { useEffect } from 'react';
import chapters from '../assets/img/chapters.jpg';
import exercises from '../assets/img/exercises.jpg';
import pythonlessons from '../assets/img/pythonlessons.jpg';
import '../css/GalleryPage.css';

const GalleryPage = () => {

  return (
    <div className="gallerypage">
      <div className="section">
        <h2>Gallery</h2>
        <p>Here are some pictures of what you will be expecting from our SOYA website!</p>
      </div>
      <div className="section">
        <img src={exercises} alt="Exercises" className="gallery-image" />
        <h2>Exercises</h2>
      </div>
      <div className="section">
        <img src={chapters} alt="Chapters" className="gallery-image" />
        <h2>Chapters</h2>
      </div>
      <div className="section">
        <img src={pythonlessons} alt="Python Lessons" className="gallery-image" />
        <h2>Python Lessons</h2>
      </div>
    </div>
  );
}

export default GalleryPage;
