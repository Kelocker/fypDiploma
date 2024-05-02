import DashboardNavbar from '../components/dashboardNavbar'
import '../css/lesson.css'
import island from '../assets/img/island.png';
import sea from '../assets/img/sea.png';
import sky from '../assets/img/sky.png';
import beach from '../assets/img/beach.png';
import React, {useState} from 'react';

const Lessons = [
    { id: 1, title: "Chapter 1", desc: "this is chapter 1"},
    { id: 2, title: "Chapter 2", desc: "this is chapter 2"},
    { id: 3, title: "Chpater 3", desc: "this is chapter 3"}
];



const Lesson = () => {
    return (
        <div>
            <DashboardNavbar />
            <div className="LessonWrapper">
                <div className="LessonContent">
                    <div className="ImageComposition">
                        <img src={sky} alt="Sky" className="skyImg" />
                        <img src={beach} alt="Beach" className="beachImg" />
                        {Lessons.sort((a, b) => b.id - a.id).map((chapter) => (
                            <div
                                key={chapter.id}
                                className="islandContainer"
                            >
                                <img 
                                    src={island} alt={`Island ${chapter.id}`} 
                                    className="islandImg" 
                                />
                                <div className="islandDesc">
                                    {chapter.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
    



export default Lesson;