import React from 'react';
import '../../css/compiler.css';

const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;
    
        if (statusId === 3) {
            return (
                <div>
                    <h2>Output</h2>
                    <pre>
                        {outputDetails?.output.compile_output}
                    </pre>
                </div>
            );
        } else if (statusId === 4) {
            return (
                <div>
                    <h2>Errors</h2>
                    <pre>{outputDetails?.output}</pre>
                </div>
            );
        } else if (statusId === 6) {
            return (
                <div>
                    <h2>Timeout</h2>
                    <pre>{outputDetails?.output}</pre>
                </div>
            );
        } else {
            return (
                <pre>
                    {outputDetails?.output}
                </pre>
                
            );
        }


        
    }
    const outputWindow = {
        backgroundColor: '#F3F4F6',
        borderRadius: '10px',
        padding: '10px',
        marginTop: '10px',
        overflowY: 'auto',
        height: '100px',
      };

    return (

        <>
        <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
        </h1>
        <div style={outputWindow}>
            {outputDetails ? <>{getOutput()}</> : null}
        </div>
        </>
    );
};

export default OutputWindow;