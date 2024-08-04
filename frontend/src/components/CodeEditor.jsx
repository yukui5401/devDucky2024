import React, { createElement, useEffect, useRef, useState } from "react";
import Mic from "./Mic";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, message, theme } from "antd";
import { Button } from "antd";
import axios from "axios";
import { marked } from "marked";


const CodeEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [_loading, setLoading] = useState(false);

  const [micResponse, setMicResponse] = useState(null);

  const [micResponseStr, setMicResponseStr] = useState(
    "Waiting on response..."
  );

  // const [advice, setAdvice] = useState(null);
  // const [code, setCode] = useState("");

  const [line = 0, setLine] = useState(0);
  const [messages = [], setMessages] = useState([]);
  const [errorCount = 0, setErrorCount] = useState(0);
  const [fixableErrorCount = 0, setFixableErrorCount] = useState(0);
  const [warnings, setWarnings] = useState(0);

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Errors/Warnings",
      children: (
        <p>
          Errors: {errorCount} <br />
          Fixable Errors: {fixableErrorCount} <br />
          Warnings: {warnings} <br />
          Line: {line} <br />
          messages: {messages.map((message) => message.message)} <br />
        </p>
      ),
      style: { panelStyle },
    },
    {
      key: "2",
      label: "Ducky Advice",
      children: <p>{micResponseStr}</p>,
      style: { panelStyle },
    },
  ];

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
        case "typescript":
          editor.session.setMode("ace/mode/javascript");
          break;
        default:
          editor.session.setMode("ace/mode/javascript");
          break;
      }
    }
  }, [language, editor]);

  const getEditorText = () => {
    if (editor) {
      setCodeInput(editor.getSession().getValue());
    }

    getLintingErrors();
  };

  const getLintingErrors = async () => {
    setLoading(true);
    let lintingErrors;
    switch (language) {
      case "cpp":
        setCodeInput("C++ Linting Errors");
        break;
      case "php":
        setCodeInput("PHP Linting Errors");
        break;
      case "python":
        lintingErrors = await axios
          .post("http://localhost:4000/linting/pylint", { code: codeInput })
          .then(async (response) => {
            const jsonResponse = response.data;
            await setLine(codeInput);
            await setMessages([]);
            await setErrorCount(jsonResponse.summary.total_errors);
            await setFixableErrorCount(0);
            await setWarnings(jsonResponse.summary.total_warnings);
          });
        break;
      case "javascript":
        lintingErrors = await axios
          .post("http://localhost:4000/linting/jslint", { code: codeInput })
          .then(async (response) => {
            const jsonResponse = response.data;
            await setLine(codeInput);
            await setMessages(jsonResponse[0].messages);
            await setErrorCount(jsonResponse[0].errorCount);
            await setFixableErrorCount(jsonResponse[0].fixableErrorCount);
            await setWarnings(jsonResponse[0].warningCount);
          });
        break;
      case "typescript":
        lintingErrors = await axios
          .post("http://localhost:4000/linting/tslint", { code: codeInput })
          .then(async (response) => {
            const jsonResponse = response.data;
            await setLine(codeInput);
            await setMessages(jsonResponse[0].messages);
            await setErrorCount(jsonResponse[0].errorCount);
            await setFixableErrorCount(jsonResponse[0].fixableErrorCount);
            await setWarnings(jsonResponse[0].warningCount);
          });
        break;
      default:
        editor.session.setMode("ace/mode/javascript");
    }

    setLoading(false);
  };

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

  useEffect(() => {}, []);
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getDucky = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5005/code-input", {
        query: editor.getSession().getValue(),
      });
    } catch (error) {
      console.error("Error making request:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update codeInput state
  const handleEditorChange = () => {
    const newCode = editor.getSession().getValue();
    setCodeInput(newCode);
  };

  const handleMicResponse = (data) => {
    setMicResponse(data);
    // setMicResponseStr(marked.parse(JSON.stringify(data, null, 2)));
    setMicResponseStr(JSON.stringify(data,null,2));
  };

  useEffect(() => {
    try {
      editor.getSession().on("change", handleEditorChange);
      return () => {
        editor.getSession().off("change", handleEditorChange);
      };
    } catch (error) {
      console.error("Error making request to handleEditorChange:", error);
    }
  }, []);

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
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <Mic codeInput={codeInput} onResponse={handleMicResponse} />
        </div>

        <div ref={editorRef} style={{ height: "400px", width: "100%" }} />
        <Button
          className="btn bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
          onClick={runCode}
        >
          Run
        </Button>
        <Button
          loading={_loading}
          className="btn bg-green-500 text-white px-8 py-2 rounded mt-4 ml-4"
          onClick={getEditorText}
        >
          Compile
        </Button>
        <Button
          loading={_loading}
          className="btn bg-yellow-500 text-white px-8 py-2 rounded mt-4 ml-4"
          onClick={getDucky}
        >
          Ducky
        </Button>
        <div className="output p-4 border-2 border-gray-800 mt-4">
          <pre>{output}</pre>
        </div>

        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems(panelStyle)}
        />
      </div>
    </>
  );
};

export default CodeEditor;
