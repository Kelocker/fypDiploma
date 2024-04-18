import React, { useEffect, useState } from "react";
import CompilerWindow from "./compilerWindow";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// do again
import { classnames } from "./general";

import DefineTheme from "./theme";
// import useKeyPress from "./useKeyPress";
import OutputWindow from "./outputWindow";
import OutputDetails from "./outputDetails";

const defaultLanguage = {
        id: 71,
        name: "Python (3.8.1)",
        label: "Python (3.8.1)",
        value: "python",
    };


const pythonDefault = `/**
print("Hello, World!")**/
`;

    

const Compiler = () => {
    const [code, setCode] = useState(pythonDefault);
    const [output, setOutput] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("solarized-light");
    
    const runCode = async () => {
      setProcessing(true);
      try {
        const formData = {
          language_id: defaultLanguage.id,
          source_code: btoa(code), // Encoding to base64
          stdin: '', // Assuming no input is necessary
        };
  
        const response = await axios({
          method: "POST",
          url: process.env.REACT_APP_RAPID_API_URL,
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
        setProcessing(false);
        // Handle error (e.g., show error message to user)
      }
    };
  
    // Function to check the status of the compilation
    const checkStatus = async (token) => {
      try {
        const response = await axios({
          method: "GET",
          url: process.env.REACT_APP_RAPID_API_URL,
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
          setProcessing(false);
          setOutput(response.data);
          // Handle the compiled code output (e.g., show it to user)
        }
      } catch (error) {
        console.error('Error checking status:', error);
        setProcessing(false);
        // Handle error (e.g., show error message to user)
      }
    };
      // function handleThemeChange(th) {
      //   const theme = th;
      //   console.log("theme...", theme);
    
      //   if (["light", "vs-dark"].includes(theme.value)) {
      //     setTheme(theme);
      //   } else {
      //     DefineTheme(theme.value).then((_) => setTheme(theme));
      //   }
      // }
      // useEffect(() => {
      //   DefineTheme("solarized-light").then((_) =>
      //     setTheme({ value: "solarized-light", label: "Solarized Light" })
      //   );
      // }, []);

    // const showSuccessToast = (msg) => {
    //     toast.success(msg || `Compiled Successfully!`, {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   };
    // const showErrorToast = (msg, timer) => {
    // toast.error(msg || `Something went wrong! Please try again.`, {
    //     position: "top-right",
    //     autoClose: timer ? timer : 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    // });
    // };


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="px-4 py-2">
                <DefineTheme
                    theme={theme}
                    handleThemeChange={setTheme}
                />
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">

                    <CompilerWindow
                        onChange={setCode}
                        // language={language}
                        code={code}
                        theme={theme}
                    />
                </div>
                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={output} />
                    <div className="flex flex-col items-end">
                        <button
                            onClick={runCode}
                            disabled={!code}
                            className={classnames(
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                !code ? "opacity-50" : ""
                              )}                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                    </div> 
                    {output && <OutputDetails outputDetails={output} />} 

                    {output === 'success' ? 
                    (<div>Success message or content here.</div>) : 
                    (<div>Failure message or content here.</div>)
                    }
                </div>
            </div>
        </>
    );
}

export default Compiler;