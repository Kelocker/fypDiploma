import React, { useState } from 'react';
import axios from 'axios';
import '../css/compiler.css';

const Compiler = ({ exerciseId }) => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleRunCode = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/execute_code/${exerciseId}/`, { code });
            setResult(response.data);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className='compiler'>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
            />
            <button onClick={handleRunCode}>Run Code</button>
            {result && (
                <div className='result'>
                    <h2>Output:</h2>
                    <pre>{result.output}</pre>
                    {result.error && (
                        <>
                            <h2>Error:</h2>
                            <pre>{result.error}</pre>
                        </>
                    )}
                </div>
            )}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Compiler;
