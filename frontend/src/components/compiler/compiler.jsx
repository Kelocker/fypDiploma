import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
// import Language from './Language';
import Output from "./outputWindow";

export const LANGUAGE_VERSIONS = {
    python: "3.10.0",
};
  
export const CODE_SNIPPETS = {
    python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
};

const Compiler = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("python");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    return (
        
        <Box>
            <HStack>
                <Box w="50%">
                    <div>Python</div>
                    <Editor
                        options={{
                            minimap: {
                                enabled: false,
                            },
                        }}

                        height="50vh"
                        theme="vs-dark" 
                        defaultLanguage="python"
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </Box>
                <Output 
                    editorRef={editorRef} 
                    language={language} 
                    />
            </HStack>
        </Box>
    );
}

export default Compiler;