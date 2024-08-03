import React, { useEffect, useRef } from "react";

const CodeEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Load Ace Editor from CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js"; // Use the CDN link for Ace Editor
    script.onload = () => {
      // Initialize Ace Editor after the script is loaded
      const editor = window.ace.edit(editorRef.current);
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/javascript");

      // Optional: Set some initial code
      editor.setValue(`function foo(items) {
  var x = "All this is syntax highlighted";
  return x;
}`);
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script and destroy the editor instance when the component unmounts
    return () => {
      document.body.removeChild(script);
      if (window.ace) {
        window.ace.edit(editorRef.current).destroy();
      }
    };
  }, []);

  return <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />;
};

export default CodeEditor;
