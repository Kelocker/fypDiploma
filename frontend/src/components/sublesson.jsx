import axios from 'axios';
import DashboardNavbar from './dashboardNavbar.jsx';
import lessonSubImg from '../assets/img/lessonSub.png';
import titleImg from '../assets/img/title.png';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/subLesson.css';

const SubLesson = () => {
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [subLessons, setSubLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChapterAndSubLessons = async () => {
            setLoading(true);
            try {
                const chapterResponse = await axios.get(`http://127.0.0.1:8000/api/chapters/${chapterId}`);
                const subLessonsResponse = await axios.get(`http://127.0.0.1:8000/api/sublesson/${chapterId}`);

                console.log(chapterResponse.data); // Debugging line
                console.log(subLessonsResponse.data); // Debugging line

                setChapter(chapterResponse.data);
                setSubLessons(Array.isArray(subLessonsResponse.data) ? subLessonsResponse.data : [subLessonsResponse.data]);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (chapterId) {
            fetchChapterAndSubLessons();
        } else {
            navigate('/');  // Redirect if no chapterId
        }
    }, [chapterId, navigate]);


    const handleLessonClick = (subLessonId) => {
        navigate(`/subContent/${subLessonId}?chapterId=${chapterId}`);
    };

    const handleTitleClick = () => {
        navigate('/lesson');  // Navigate back to the lessons page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Ensure chapter is defined before accessing its properties
    const chapterTitle = chapter ? chapter.title : '';
    const chapterDescription = chapter ? chapter.description : '';

    // Filter subLessons to only include those with the same chapter ID
    const filteredSubLessons = subLessons.filter(subLesson => subLesson.chapter === parseInt(chapterId));

    return (
        <>
            <DashboardNavbar />
            <div className="subLesson-wrapper">
                {chapter && (
                    <div className="sub-image-container">
                        <img 
                            src={titleImg} 
                            alt="Title Background" 
                            className="title-image" 
                            onClick={handleTitleClick}  // Add onClick handler to title image
                        />
                        <div className="overlay-text">
                            <h1>{chapterTitle}</h1>
                            <p>{chapterDescription}</p>
                        </div>
                    </div>
                )}
                {filteredSubLessons.map((subLesson, index) => (
                    <div key={subLesson.id} className="sub-image-container">
                        <img 
                            src={lessonSubImg} 
                            alt={`Lesson Sub ${index + 1}`} 
                            className="sub-image" 
                            onClick={() => handleLessonClick(subLesson.id)} 
                        />
                        <div className='sub-text'>
                            <h2>{subLesson.title}</h2>
                            <p>{subLesson.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SubLesson;

