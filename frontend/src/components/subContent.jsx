import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/Learning/CodeEditor.jsx';
import axios from 'axios';

const SubContent = () => {
    const { subLessonId } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching topics for subLessonId:', subLessonId);
        // Reset state on subLessonId change
        setTopics([]);
        setLoading(true);
        setError(null);

        const fetchTopicsAndExamples = async () => {
            try {
                // Fetch topics related to the subLesson
                const topicsResponse = await axios.get(`http://127.0.0.1:8000/api/topics/?sublesson=${subLessonId}`);
                console.log('Topics Response for subLessonId:', subLessonId, topicsResponse.data);

                if (Array.isArray(topicsResponse.data)) {
                    // Fetch examples for each topic
                    const topicsWithExamples = await Promise.all(topicsResponse.data.map(async (topic) => {
                        const examplesResponse = await axios.get(`http://127.0.0.1:8000/api/examples/?topic=${topic.id}`);
                        console.log(`Examples for Topic ${topic.id}:`, examplesResponse.data);
                        return { ...topic, examples: examplesResponse.data.filter(example => example.topic === topic.id) };
                    }));
                    console.log('Final Topics with Examples for subLessonId:', subLessonId, topicsWithExamples);
                    setTopics(topicsWithExamples);
                } else {
                    throw new Error("Topics response is not an array");
                }
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTopicsAndExamples();
    }, [subLessonId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <DashboardNavbar />
            {Array.isArray(topics) && topics.map(topic => (
                <div key={topic.id} style={{ marginBottom: '2rem' }}>
                    <h2>{topic.title}</h2>
                    <p>{topic.description}</p>
                    <div style={{ marginLeft: '1rem' }}>
                        {Array.isArray(topic.examples) && topic.examples.map(example => (
                            <div key={example.id} style={{ marginBottom: '1rem' }}>
                                <CodeEditor initialCode={example.code.replace(/\\n/g, '\n')} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubContent;
