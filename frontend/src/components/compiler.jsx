import React, { useState } from 'react';
import axios from 'axios';
import '../css/compiler.css'; // Import the CSS

const Compiler = ({ testType, testId }) => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleRunCode = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/execute_code/${testType}/${testId}/`, {
                code: code
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResult(response.data);
            setStatus(response.data.success ? 'success' : 'fail');
        } catch (e) {
            setError(e.message);
            setStatus('fail');
        }
    };

    return (
        <div className='compiler'>
            <h2>Code Editor</h2>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Write your code here..." />
            <button onClick={handleRunCode}>Run Code</button>
            {status && <div className={`result-status ${status}`}>{status === 'success' ? 'Test Passed!' : 'Test Failed!'}</div>}
            {result && (
                <div className='result'>
                    <h2>Output:</h2>
                    <pre>{result.output}</pre>
                    {result.error && (
                        <>
                            <h2>Result:</h2>
                            <pre>{result.error}</pre>
                        </>
                    )}
                    {result.testResults && result.testResults.map(test => (
                        <div key={test.name} className={`test-result ${test.passed ? 'passed' : 'failed'}`}>
                            <h3>{test.name}</h3>
                            <p>{test.message}</p>
                        </div>
                    ))}
                </div>
            )}
            {error && <div className="error">Error: {error}</div>}
        </div>
    );
};


export default Compiler;