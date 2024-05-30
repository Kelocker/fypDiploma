import DashboardNavbar from '../components/dashboardNavbar'
import '../css/lesson.css'
import island from '../assets/img/island.png';
import sky from '../assets/img/sky.png';
import beach from '../assets/img/beach.png';
import React, {useState, useEffect} from 'react';
// import SubLesson from '../components/sublesson.jsx';
import { useNavigate } from 'react-router-dom';

const Lesson = () => {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/chapters/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setChapters(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchChapters();
    }, []);

    const handleChapterClick = (chapterId) => {
        navigate(`/sublesson/${chapterId}`);
    };
    if (loading) return <div>Loading chapters...</div>;
    if (error) return <div>Error fetching chapters: {error}</div>;

    return (
        <div>
            <DashboardNavbar />
            <div className="LessonWrapper">
                <div className="LessonContent">
                    <div className="ImageComposition">
                        <img src={sky} alt="Sky" className="skyImg" />
                        <img src={beach} alt="Beach" className="beachImg" />
                        {chapters.sort((a, b) => b.id - a.id).map((chapter, index) => (
                            <div
                                key={chapter.id}
                                className="islandContainer" 
                                style={{left: index % 2 === 0 ? '0%' : '10%' 
                            }}>

                                <img 
                                    src={island} alt={`Island ${chapter.id}`} 
                                    className="islandImg"
                                    onClick={() => handleChapterClick(chapter.id)} 
                                    style={{ cursor: 'pointer' }}
 
                                />
                                <div className="islandDesc"
                                style={{
                                    left: index % 2 === 0 ? '0' : '20%', // Align left if island is on the left
                                    right: index % 2 === 0 ? '0' : '0', // Align right if island is on the right
                                    textAlign: index % 2 === 0 ? 'left' : 'right' // Text align based on side
                                }}>
                                    {chapter.title}
                                    {chapter.description}
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