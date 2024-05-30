import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Textarea } from "@chakra-ui/react";

const Output = ({ editorRef, language }) => {
    const [output, setOutput] = useState('');

    const runCode = async () => {
        const code = editorRef.current.getValue();
        try {
            const response = await axios.post('http://localhost:8000/api/run_code/', { code, language });
            setOutput(response.data.output);
        } catch (error) {
            console.error(error);
            setOutput('Error running code.');
        }
    };

    const runTests = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/run_tests/');
            setOutput(response.data.output);
        } catch (error) {
            console.error(error);
            setOutput('Error running tests.');
        }
    };

    return (
        <Box w="50%">
            <Button onClick={runCode} colorScheme="blue" mb={4}>Run Code</Button>
            <Button onClick={runTests} colorScheme="green" mb={4}>Run Tests</Button>
            <Textarea readOnly value={output} height="50vh" />
        </Box>
    );
};

export default Output;
