// import { useRef, useState, useEffect } from "react";
// import { Box, HStack, Text } from "@chakra-ui/react";
// import { Editor } from "@monaco-editor/react";
// import ResizeObserver from 'resize-observer-polyfill';
// import { executeCode } from './Learning/executeCode.js'; 
// import '../css/Editor.css';

// const CodeEditor = () => {
//   const editorRef = useRef();
//   const [value, setValue] = useState('');
//   const [output, setOutput] = useState('');
//   const containerRef = useRef();
//   const [editorHeight]= useState('50vh'); 

// //   useEffect(() => {
// //     // setValue(initialCode);
// //     // const lineCount = (initialCode.match(/\n/g) || []).length + 1;
// //     const newHeight = Math.min(Math.max(lineCount * 20, 100), 500); 
// //     setEditorHeight(`${newHeight}px`);
// //   }, []);
// // //   }, [initialCode]);

//   useEffect(() => {
//     const resizeObserver = new ResizeObserver(() => {
//       if (editorRef.current) {
//         editorRef.current.layout();
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, []);

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const handleRunCode = async () => {
//     try {
//       const result = await executeCode("python", value);
//       setOutput(result.run.output);
//     } catch (error) {
//       console.error('There was an error executing the code!', error);
//       setOutput('Error executing code.');
//     }
//   };

//   return (
//     <Box className="editor-container" ref={containerRef}>
//       <HStack spacing={4}>
//         <Box w="100%" className="code-editor">
//           <Editor
//             options={{
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               mouseWheelZoom: false,
//               eventResizeFeature: {
//                 disabled: true,
//               },
//               forceUseResizeObserver: true,
//             }}
//             height={editorHeight}
//             theme="vs-dark"
//             language="python"
//             value={value}
//             onMount={onMount}
//             onChange={(value) => setValue(value)}
//           />
//             <div>
//                 <button className="run-button" onClick={handleRunCode}>Run Code</button>
//             </div>
//           {output && (
//             <Box className="output-container">
//               <Text className='output' fontSize="lg">Output:</Text>
//               <pre>{output}</pre>
//             </Box>
//           )}
//         </Box>
//       </HStack>
//     </Box>
//   );
// };

// export default CodeEditor;


import { useRef, useState, useEffect } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import ResizeObserver from 'resize-observer-polyfill';
import { executeCode } from './Learning/executeCode.js'; 
import '../css/Editor.css';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('#write your python code here');
  const [output, setOutput] = useState('');
  const containerRef = useRef();
  const [editorHeight]= useState('50vh'); 

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
    <Box className="editor-container" ref={containerRef}>
      <HStack spacing={4}>
        <Box w="100%" className="code-editor">
          <Editor
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              mouseWheelZoom: false,
              eventResizeFeature: {
                disabled: true,
              },
              forceUseResizeObserver: true,
            }}
            height={editorHeight}
            theme="vs-dark"
            language="python"
            value={value}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
            <div>
                <button className="run-button" onClick={handleRunCode}>Run Code</button>
            </div>
          {output && (
            <Box className="output-container">
              <Text className='output' fontSize="lg">Output:</Text>
              <pre>{output}</pre>
            </Box>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
