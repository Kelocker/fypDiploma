import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Quiz from '../components/quiz.jsx';


const SubContent = () => {
    const { subLessonId } = useParams();
    const [lessons, setLesson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const contentResponse = await axios.get(`http://127.0.0.1:8000/api/sublesson/${subLessonId}`);
                setLesson(Array.isArray(contentResponse.data) ? contentResponse.data : [contentResponse.data]);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
                
        };

        if (subLessonId) {
            fetchContent();
        }
        

        
    }, [subLessonId, navigate]);

    if (loading) return <div>Loading sublesson...</div>;
    if (error) return <div>Error fetching sublesson: {error}</div>;

    return (
        <div>
            <h2>Lessons</h2>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.id}>
                        <h3>{lesson.title}</h3>
                        <p>{lesson.content}</p>
                        <Quiz />
                        {/* <button onClick={}></button>                                               */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubContent;
