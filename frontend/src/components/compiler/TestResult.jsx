import React, { useState, useEffect } from 'react';

const TestResults = () => {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/test-results/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) return <div>Loading test results...</div>;
    if (error) return <div>Error fetching results: {error}</div>;
    if (!results) return <div>No results available.</div>;

    const testCaseStyle = {
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
    };

    const testNameStyle = {
        fontWeight: 'bold'
    };

    return (
        <div>
            <h2>Test Results</h2>
            <p>{results.message}</p>
            <h3>Code Output</h3>
            <pre>{results.output}</pre>
            <h3>Summary</h3>
            <ul>
                <li>Total Tests: {results.results.total_tests}</li>
                <li>Failures: {results.results.failures}</li>
                <li>Errors: {results.results.errors}</li>
                <li>Skipped: {results.results.skipped}</li>
                <li>Successful: {results.results.successful ? 'Yes' : 'No'}</li>
            </ul>
            <h3>Test Cases</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {results.results.test_cases.map((test, index) => (
                    <li key={index} style={testCaseStyle}>
                        <span style={testNameStyle}>
                            Test {index + 1}: {test.name} ({test.status})
                        </span>
                        <pre>{test.code}</pre>
                        {test.status !== 'Passed' && test.traceback && (
                            <details>
                                <summary>Traceback</summary>
                                <pre>{test.traceback}</pre>
                            </details>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestResults;
