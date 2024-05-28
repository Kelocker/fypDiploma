import Compiler from '../components/compiler/compiler.jsx';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Quiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchQuiz = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/quiz/${quizId}/`);
            console.log(response.data);
            setQuiz(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
                
        };

        
        if (quizId) {
            fetchQuiz();
        }
          
    }, [quizId]);

    if (loading) {
        return <div>Loading quiz...</div>;
    }
    if (error) {
        return <div>Error fetching quiz: {error}</div>;
    }
    

    const formatNewlines = (text) => {
        return { __html: text.replace(/\r\n|\n|\r/g, '<br>') };
    };

    return (
        <div className='quizWrapper'>
            <ul>
                {quiz.map((question) => (
                    <li key={question.id}>
                        <h2>Question {question.id}</h2>
                        <p dangerouslySetInnerHTML={formatNewlines(question.question)} />
                        {question.answer !== undefined ? <Compiler /> : <p>No answer provided</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Quiz;
