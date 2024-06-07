import React from 'react';
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
        <h2>Exercises</h2>
        <img src={exercises} alt="Exercises" className="gallery-image" />
        
      </div>
      <div className="section">
        <h2>Chapters</h2>
        <img src={chapters} alt="Chapters" className="gallery-image" />
        
      </div>
      <div className="section">
        <h2>Python Lessons</h2>
        <img src={pythonlessons} alt="Python Lessons" className="gallery-image" />
        
      </div>
    </div>
  );
}

export default GalleryPage;
