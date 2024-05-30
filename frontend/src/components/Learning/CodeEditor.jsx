import { useRef, useState, useEffect } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { executeCode } from './executeCode'; // Adjust the path as needed
import '../../css/Editor.css';

const CodeEditor = ({ initialCode, isExecutable }) => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [output, setOutput] = useState('');
  const [editorHeight, setEditorHeight] = useState('30vh'); // Default height

  useEffect(() => {
    setValue(initialCode);
    const lineCount = (initialCode.match(/\n/g) || []).length + 1;
    const newHeight = Math.min(Math.max(lineCount * 20, 100), 500); // Adjust min and max height as needed
    setEditorHeight(`${newHeight}px`);
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
    <Box className="editor-container">
      <HStack spacing={4}>
        <Box w="100%" className="code-editor">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              mouseWheelZoom: false,
            }}
            height={editorHeight}
            theme="vs-dark"
            language="python"
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
          {isExecutable && (
            <div>
              <button className="run-button" onClick={handleRunCode}>Test Example</button>
            </div>
          )}
          {output && (
            <Box className="output-container">
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
