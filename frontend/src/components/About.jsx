import React from 'react'
import '../css/About.css'
import ChuaHuiWen from '../assets/img/ChuaHuiWen.jpeg';
import HewYeeKit from '../assets/img/HewYeeKit.jpeg';
import LimGenJack from '../assets/img/LimGenJack.jpeg';
import ChongKelvin from '../assets/img/ChongKelvin.jpeg';

const About = () => {
  return (
    <div className="About-container">
      <div className="About-title">
        About Us
      </div>

      <div className="About-content-container" >
       

       {/* Chua Hui Wen */}
        <div className="Our-developer-card" onClick={() => window.open("https://github.com/CHUA1605", "_blank", "noopener,noreferrer")}>

          <div className="Our-developer-img">
            <img src={ChuaHuiWen} alt=""/>
          </div>

          <div className="Our-developer-details">
            
            <span className="developer-name">Chua Hui Wen</span>
            <span className="developer-title">Full Stack developer</span>

          </div>
          
        </div>


        {/* Chong Kelvin */}
        <div className="Our-developer-card" onClick={() => window.open("https://github.com/Kelocker", "_blank", "noopener,noreferrer")}>

          <div className="Our-developer-img">
            <img src={ChongKelvin} alt=""/>
          </div>

          <div className="Our-developer-details">
            
            <span className="developer-name">Chong Kelvin</span>
            <span className="developer-title">Full Stack developer</span>

          </div>

          </div>


        {/* Hew Yee Kit */}
        <div className="Our-developer-card" onClick={() => window.open("https://github.com/Oregonn", "_blank", "noopener,noreferrer")}>

          <div className="Our-developer-img">
            <img src={HewYeeKit} alt=""/>
          </div>

          <div className="Our-developer-details">
            
            <span className="developer-name">Hew Yee Kit</span>
            <span className="developer-title">Full Stack developer</span>

          </div>
          
        </div>



        {/* Lim Gen Jack */}
        <div className="Our-developer-card" onClick={() => window.open("https://github.com/Jack-1118", "_blank", "noopener,noreferrer")}>

          <div className="Our-developer-img">
            <img src={LimGenJack} alt=""/>
          </div>

          <div className="Our-developer-details">
            
            <span className="developer-name">Lim Gen Jack</span>
            <span className="developer-title">Full Stack developer</span>

          </div>
          
        </div>
      
      </div>

      
  

     

    </div>

    
  )
}

export default About