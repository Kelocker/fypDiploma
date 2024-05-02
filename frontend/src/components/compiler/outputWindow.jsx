import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import '../../css/compiler.css';

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        p={2}
        color={isError ? "red.400" : ""}
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        <div className='comp-outputWindow'>
        {output
          ? output.map((line, i) => <Text m={4} key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
        </div>
      </Box>
    </Box>
  );
};
export default Output;
