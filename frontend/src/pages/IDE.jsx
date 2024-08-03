import React from "react";
import MicToggle from "../components/MicToggle";

const IDE = () => {
  return (
    <>
      <div className="p-4 bg-slate-200 flex justify-between items-center">
        <div className="text-left">
          <label htmlFor="languages" className="mr-4">
            Select Language:
          </label>
          <select
            id="languages"
            className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700"
            onchange="changeLanguage()"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="node">Node JS</option>
          </select>
        </div>
        <MicToggle />
      </div>
      <div className="h-400 editor" id="editor"></div>

      <div className="text-right p-4">
        <button className="btn" onclick="executeCode()">
          {" "}
          Run{" "}
        </button>
      </div>

      <div className="p-4 b-2 border-gray-800 w-99"></div>
    </>
  );
};

export default IDE;
