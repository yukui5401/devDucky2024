import React from "react";
import CodeEditor from "../components/CodeEditor";
import Mic from "../components/Mic";

const IDE = () => {
  return (
    <>
      <MicToggle />
      <Mic />
      <CodeEditor />
    </>
  );
};

export default IDE;
