// import { useState } from "react";
// import TestResults from './TestResult.jsx';
// import Editor from "@monaco-editor/react";


// function Compiler() {
//     const [code, setCode] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!code.trim()) {
//             setError('Code cannot be empty');
//             return; // Prevent form submission
//         }

//         setLoading(true);
//         setError(''); // Clear previous errors

//         try {
//             console.log('Sending data:', JSON.stringify({ code })); // Debugging log
//             const response = await fetch('http://localhost:8000/api/code-snippets/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ code })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json(); // Attempt to parse error data
//                 throw new Error(`Failed to submit code: ${response.statusText} - ${errorData.detail || errorData.message || ''}`);
//             }

//             const data = await response.json();
//             console.log('Code submitted successfully!', data);
//             setCode(''); // Clear the textarea upon successful submission
//             // check again i don't want clear, remain the code but prevent duplicate submission
//         } catch (error) {
//             console.error('Submission error:', error);
//             setError(error.message || 'Unexpected error, please try again.'); // Display a user-friendly error message
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div>
//             <Editor
//                 height="50vh"
//                 theme="vs-dark"
//                 defaultLanguage="python"
//                 defaultValue={code}
//                 value={code}
//                 onChange={(value) => setCode(value)}
//             />
//             <button onClick={handleSubmit} disabled={loading}>
//                 {loading ? 'Submitting...' : 'Submit Code'}
//             </button>
//             {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
//             </div>
//             <div>
//                 <TestResults />
//             </div>
//         </>
//     );
// }    
// export default Compiler;

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import TestResults from './TestResult.jsx';

const Compiler = () => {
    const [code, setCode] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/code-snippets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (error) {
            setError(`Submission failed: ${error.message}`);
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
                    defaultValue=""
                    value={code}
                    onChange={(value) => setCode(value || '')}
                />
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Code'}
                </button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>
            <div>
                {results && <TestResults results={results} />}
            </div>
        </>
    );
};

export default Compiler;
