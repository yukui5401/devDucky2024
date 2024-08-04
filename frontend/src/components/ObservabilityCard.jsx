import React from "react";
import { Button } from "antd";

const CodeExecutionTimer = ({
  code,
  setCode,
  executionTime,
  result,
  executeCode,
  copyCode,
  pasteCode,
}) => {
  return (
    <div className="">
      <h1 className="font-bold">Code Execution Timer</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="20"
        cols="125"
        placeholder="Enter JavaScript code here"
      />
      <br />
      <Button onClick={executeCode}>Execute Code</Button>
      <Button onClick={copyCode}>Copy Code</Button>
      <Button onClick={pasteCode}>Paste Code</Button>
      {executionTime !== null && (
        <div>
          <p>Execution Time: {executionTime.toFixed(4)} ms</p>
          <p>Result: {String(result)}</p>
        </div>
      )}
    </div>
  );
};

export default CodeExecutionTimer;
