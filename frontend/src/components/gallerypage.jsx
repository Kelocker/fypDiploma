import React from 'react';
import '../css/GalleryPage.css';

const GalleryPage = () => {
  return (
    <div className="gallerypage">
      <div className="section intermediate">
        <h2>Gallery</h2>
        <p>Here are some pictures of what you will be expecting from our SOYA website!</p>
      </div>
      <div className="section">
        <img src="path/to/image1.jpg" alt="Crown Plaza Tampa" className="gallery-image" />
        <h2>Crown Plaza Tampa</h2>
      </div>
      <div className="section">
        <img src="path/to/image2.jpg" alt="Toddlers" className="gallery-image" />
        <h2>Toddlers</h2>
      </div>
      <div className="section">
        <img src="path/to/image3.jpg" alt="Young and Restless" className="gallery-image" />
        <h2>Young and Restless</h2>
      </div>
      <div className="section">
        <img src="path/to/image4.jpg" alt="Green Interiors" className="gallery-image" />
        <h2>Green Interiors</h2>
      </div>
    </div>
  );
}

export default GalleryPage;
