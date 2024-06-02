import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CodeEditor from '../components/Learning/CodeEditor.jsx';
import axios from 'axios';
import DashboardNavbar from './dashboardNavbar.jsx';
import '../css/subContent.css';

const SubContent = () => {
    const { subLessonId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const chapterId = new URLSearchParams(location.search).get('chapterId');
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        setTopics([]);
        setLoading(true);
        setError(null);
        setNoData(false);

        const fetchTopicsAndExamples = async () => {
            try {
                const topicsResponse = await axios.get(`http://127.0.0.1:8000/api/topics/?sublesson=${subLessonId}`);

                if (Array.isArray(topicsResponse.data) && topicsResponse.data.length > 0) {
                    const topicsWithExamples = await Promise.all(topicsResponse.data.map(async (topic) => {
                        const examplesResponse = await axios.get(`http://127.0.0.1:8000/api/examples/?topic=${topic.id}`);
                        return { ...topic, examples: examplesResponse.data.filter(example => example.topic === topic.id) };
                    }));
                    setTopics(topicsWithExamples);
                } else {
                    setNoData(true);
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };


        fetchTopicsAndExamples();
    }, [subLessonId]);

    const handleExit = () => {
        navigate(`/sublesson/${chapterId}`);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (noData) {
        return <div>No data found.</div>;
    }

    return (
        <>
            <DashboardNavbar />
            <div className="subContent-container">
                <div className="subcontent">
                    {topics.map(topic => (
                        <div key={topic.id} className="topic">
                            <h2>{topic.title}</h2>
                            <pre>{topic.description}</pre>
                            <div className="examples">
                                {Array.isArray(topic.examples) && topic.examples.map(example => (
                                    <div key={example.id} className="example">
                                        <CodeEditor initialCode={example.code.replace(/\\n/g, '\n')} isExecutable={example.is_executable} />
                                        <pre>{example.description}</pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="subContent-buttons">
                        <button onClick={handleExit}>Exit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubContent;

