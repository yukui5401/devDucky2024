import React, { useEffect, useRef, useState } from "react";
import MicToggle from "../components/MicToggle";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // Load Ace Editor from CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js";
    script.onload = () => {
      const aceEditor = window.ace.edit(editorRef.current);
      aceEditor.setTheme("ace/theme/monokai");
      aceEditor.session.setMode("ace/mode/javascript");
      setEditor(aceEditor);
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script and destroy the editor instance
    return () => {
      document.body.removeChild(script);
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editor) {
      switch (language) {
        case "c":
        case "cpp":
          editor.session.setMode("ace/mode/c_cpp");
          break;
        case "php":
          editor.session.setMode("ace/mode/php");
          break;
        case "python":
          editor.session.setMode("ace/mode/python");
          break;
        case "javascript":
          editor.session.setMode("ace/mode/javascript");
          break;
        default:
          editor.session.setMode("ace/mode/javascript");
          break;
      }
    }
  }, [language, editor]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const runCode = () => {
    if (!editor) return;

    const code = editor.getSession().getValue();

    if (language === "javascript") {
      try {
        // Create a new function to capture output
        const oldLog = console.log;
        let log = "";
        console.log = (...args) => {
          log +=
            args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg) : arg
              )
              .join(" ") + "\n";
        };

        // Execute the code
        new Function(code)();

        // Restore the original console.log
        console.log = oldLog;

        setOutput(log || "No output");
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    } else {
      // For other languages, make the server request
      fetch("/ide/app/compiler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      })
        .then((response) => response.text())
        .then((result) => setOutput(result))
        .catch((error) => setOutput(`Error: ${error.message}`));
    }
  };

  return (
    <>
      <div>
        <div className="p-4 bg-slate-200 flex justify-between items-center">
          <div className="text-left flex items-center">
            <label htmlFor="languages" className="mr-4">
              Select Language:
            </label>
            <select
              id="languages"
              value={language}
              onChange={handleLanguageChange}
              className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700"
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <MicToggle />
        </div>

        <div ref={editorRef} style={{ height: "400px", width: "100%" }} />
        <button
          className="btn bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={runCode}
        >
          Run
        </button>
        <div className="output p-4 border-2 border-gray-800 mt-4">
          <pre>{output}</pre>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
