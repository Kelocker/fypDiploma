// hard coded to show the sub lesson
import React from 'react';
import ReactDOM from 'react-dom';
import DashboardNavbar from '../components/dashboardNavbar'
import lessonSubImg from '../assets/img/lessonSub.png';
import titleImage from '../assets/img/title.png'; 
import '../css/subLesson.css';

const subLessons = [
    { id: 1, topicId: "TP1", desc: "1.1"},
    { id: 2, topicId: "TP1", desc: "1.2" },
    { id: 3, topicId: "TP1", desc: "1.3" }
  ];

  const SubLesson = () => {
    return (
        <>
            <DashboardNavbar />
            <div className="subLesson-wrapper">
                {subLessons.map(subLesson => (
                    <div key={subLesson.id} className="subLesson-items">
                        <div className="subLesson-item">
                            <img src={lessonSubImg} alt={`Sub Lesson ${subLesson.desc}`} />
                            <span className="subLesson-text">{subLesson.desc}</span>
                        </div>
                    </div> 
                ))}
            </div>
        </>
    );
};

ReactDOM.render(<SubLesson />, document.getElementById('root'));
export default SubLesson;