import { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { executeCode } from './executeCode'; // Adjust the path as needed

const CodeEditor = ({ initialCode }) => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Replace escaped newline characters with actual newlines
    const formattedCode = initialCode.replace(/\\n/g, '\n');
    setValue(formattedCode);
  }, [initialCode]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRunCode = async () => {
    try {
      const result = await executeCode("python", value);
      setOutput(result.run.output);
    } catch (error) {
      console.error('There was an error executing the code!', error);
      setOutput('Error executing code.');
    }
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              mouseWheelZoom: false,
            }}
            height="30vh"
            theme="vs-dark"
            language="python"
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
          <Button colorScheme="green" onClick={handleRunCode} mt={2}>Run Code</Button>
          {output && (
            <Box mt={4}>
              <Text fontSize="lg">Output:</Text>
              <pre>{output}</pre>
            </Box>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
