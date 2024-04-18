// import React from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import '../css/lesson.css'
import sky from '../assets/img/sky.jpg';
import island from '../assets/img/island.jpg';
// import mockData from '../screens/data.json';
// import axios from 'axios';
import React, { useState} from 'react';
// import MockAdapter from 'axios-mock-adapter';


const Lesson = () => {
    const [toggle, setToggle] = useState(true);
    const [data, setData] = useState(null);
    const image1 = {island};  // URL of the first image

    const handleClick = () => {
        setToggle(!toggle);
        setData({ some: 'data' });
    };

    return (
        <div>
            <DashboardNavbar />
            <div className="LessonWrapper">
                <div className="LessonContent">
                    <h1>Lesson Title</h1>
                    <img src={sky} alt="sky Image" className="skyImg"/>
                    <img src={toggle && data ? image1 : {island}} alt="Toggle Image" className="islandImg"/>
                    <button onClick={handleClick}>Load Data and Toggle Image</button>
                </div>               
            </div>
        </div>
    );
};

export default Lesson;