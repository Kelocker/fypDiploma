import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

const CompilerWindow = ({ onChange, language, code, theme}) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    return (
        <div>
            <Editor
                height="80vh"
                width="100%"
                language={"python"}
                defaultValue="//Enter your code here" //change this cmt to green color
                value={value}
                onChange={handleEditorChange}
                theme={theme}
            />
        </div>
    );
};
export default CompilerWindow;