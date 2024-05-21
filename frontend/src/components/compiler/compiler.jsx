import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
// import TestResults from './TestResult.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Compiler = () => {
    const { quizId } = useParams();
    const [code, setCode] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const handleSubmit = async () => {
        if (!code.trim()) {
            setError('Code cannot be empty');
            return;
        }

        if (!code.trim()) {
            setError('Code cannot be empty');
            return;
        }

        setLoading(true);
        setError(null);  // Clear previous errors

        setError(null);  // Clear previous errors

        try {
            console.log('Fetching quiz details for quizId:', quizId);
            const quizResponse = await axios.get(`http://127.0.0.1:8000/api/quiz/${quizId}/`);
            const answerPath = quizResponse.data.answer;
            console.log('Quiz answer path:', answerPath);

            console.log('Sending code for execution:', code);
            const response = await axios.post('http://127.0.0.1:8000/api/code-snippets/', {
                code: code,
                quiz: quizId,
                answerPath: answerPath  // Include answerPath in the request
            });
            console.log('Submission response:', response.data);
            if (response.status === 201) {
                setResults(response.data.result);  // Directly set the result
                console.log('Execution result:', response.data.result);
            } else {
                throw new Error('Failed to submit code');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setError(error.response?.data?.detail || 'Unexpected error, please try again.');
            console.error('Submission error:', error);
            setError(error.response?.data?.detail || 'Unexpected error, please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <div>
                <Editor
                    height="50vh"
                    theme="vs-dark"
                    defaultLanguage="python"
                    defaultValue="" //can add code here
                    value={code}
                    onChange={(value) => setCode(value || '')}
                />
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Code'}
                </button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>

            <div>
                <button onClick={toggleVisibility}>
                    {isVisible ? 'Hide Test Case' : 'Show Test Case'}
                </button>
                {isVisible && results && <pre style={{ background: '#f4f4f4', padding: '10px', border: '1px solid #ccc' }}>{results}</pre>}
            </div>
        </>
    );
};

export default Compiler;
// const handleSubmit = async () => {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/code-snippets/${quizId}`);
    //     console.log(response.data);
    //     // Handle response and update UI accordingly
    // };

    // const handleSubmit = async () => {
    //     if (!code.trim()) {
    //         setError('Code cannot be empty');
    //         return; // Prevents form submission if code is empty
    //     }
    
    //     setLoading(true);
    //     setError(null); // Clear any previous errors
    
    //     try {
    //         const response = await axios.post(`http://127.0.0.1:8000/api/code-snippets/`, { code });
    
    //         if (response.status === 201) {
    //             console.log('Code submitted successfully!', response.data);
    //             setResults(response.data);
    //             // Optional: Clear the code if needed
    //             // setCode(''); 
    //         } else {
    //             throw new Error('Failed to submit code');
    //         }
    //     } catch (error) {
    //         console.error('Submission error:', error);
    //         setError(error.response?.data?.detail || 'Unexpected error, please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };