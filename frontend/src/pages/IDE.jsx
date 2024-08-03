import React from "react";
import MicToggle from "../components/MicToggle";
import CodeEditor from "../components/CodeEditor";
import Mic from "../components/Mic";

const IDE = () => {
  return (
    <>
      <MicToggle />
      <Mic/>
      <CodeEditor />
    </>
  );
};

export default IDE;
