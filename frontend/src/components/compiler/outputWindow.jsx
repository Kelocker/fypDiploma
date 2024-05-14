import '../../css/compiler.css';

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
