import React, { useState } from 'react';
import axios from 'axios';

const defaultLanguage = {
  id: 71,
  name: "Python (3.8.1)",
  label: "Python (3.8.1)",
  value: "python",
};

const Landing = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  

  // Function to make an API request to compile the code
  const compileCode = async () => {
    setIsProcessing(true);
    try {
      const formData = {
        language_id: defaultLanguage.id,
        source_code: btoa(code), // Encoding to base64
        stdin: '', // Assuming no input is necessary
      };

      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_RAPID_API_URL}/submissions/?base64_encoded=true`,
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
        data: formData,
      });

      const token = response.data.token;
      checkStatus(token);
    } catch (error) {
      console.error('Error compiling code:', error);
      setIsProcessing(false);
      // Handle error (e.g., show error message to user)
    }
  };

  // Function to check the status of the compilation
  const checkStatus = async (token) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_RAPID_API_URL}/submissions/${token}?base64_encoded=true`,
        headers: {
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
      });

      const statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        // If still processing, check again after a delay
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else {
        // Compilation finished
        setIsProcessing(false);
        setOutput(response.data);
        // Handle the compiled code output (e.g., show it to user)
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setIsProcessing(false);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={isProcessing}
      />
      <button onClick={compileCode} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Compile Code'}
      </button>
      {output && <pre>{atob(output.stdout || '')}</pre>}
      {/* Display output or error message */}
    </div>
  );
};

export default Landing;


axios.post('/api/data', {
    firstName: 'John',
    lastName: 'Doe'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  