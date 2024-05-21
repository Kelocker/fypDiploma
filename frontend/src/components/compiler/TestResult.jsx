// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const TestResults = () => {
//     const { quizId } = useParams();

//     const [results, setResults] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchResults = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/code-snippets/${quizId}`);
//                 setResults(response.data);
//                 console.log(results);

//             } catch (err) {
//                 setError(err.message);
//             }
//             setLoading(false);
//         };
//         fetchResults();
//     }, [quizId]);

//     if (loading) return <div>Loading test results...</div>;
//     if (error) return <div>Error fetching results: {error}</div>;
//     if (!results) return <div>No results available.</div>;

//     const testCaseStyle = {
//         padding: '10px',
//         margin: '5px 0',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         backgroundColor: '#f9f9f9'
//     };

//     const testNameStyle = {
//         fontWeight: 'bold'
//     };

//     return (
//         <div>
//             <h2>Test Results</h2>
//             <p>{results.message}</p>
//             <h3>Code Output</h3>
//             <pre>{results.output}</pre>
//             <h3>Summary</h3>
//             <ul>
//                 <li>Total Tests: {results.results.total_tests}</li>
//                 <li>Failures: {results.results.failures}</li>
//                 <li>Errors: {results.results.errors}</li>
//                 <li>Skipped: {results.results.skipped}</li>
//                 <li>Successful: {results.results.successful ? 'Yes' : 'No'}</li>
//             </ul>
//             <h3>Test Cases</h3>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//                 {results.results.test_cases.map((test, index) => (
//                     <li key={index} style={testCaseStyle}>
//                         <span style={testNameStyle}>
//                             Test {index + 1}: {test.name} ({test.status})
//                         </span>
//                         <pre>{test.code}</pre>
//                         {test.status !== 'Passed' && test.traceback && (
//                             <details>
//                                 <summary>Traceback</summary>
//                                 <pre>{test.traceback}</pre>
//                             </details>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TestResults;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestResults() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/run-tests/')
            .then(response => {
                setResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching test results:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading tests...</div>;
    if (error) return <div>Error loading results: {error.message}</div>;
    if (!results) return <div>No results found.</div>;

    return (
        <div>
            <h1>Test Results</h1>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
}

export default TestResults;
