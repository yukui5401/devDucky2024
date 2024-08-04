import { useState, useEffect } from "react";
import axios from "axios";

export const domain = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_URL
  : import.meta.env.VITE_LOCAL_URL;

const finalAnswer = async () => {
  const answer = await axios.post(
    // get code response (in JSON) from model
    "http://localhost:5005/generate-suggestions",
    {
      query: "if (file) { return 'not found' } else { return 'not found' }",
      transcribed: "What is wrong with my code!",
    }
  );
  let formattedAnswer = answer.data;
  console.log(formattedAnswer);
};

export default function MicTest() {
  const [fullTranscript, setFullTranscript] = useState("");
  const [paused, setPaused] = useState(false);
  const [tempTranscript, setTempTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [recognitionActive, setRecognitionActive] = useState(false);

  const startRecognition = () => {
    if (recognition && !recognitionActive) {
      recognition.start();
      setRecognitionActive(true);
    }
  };

  const stopRecognition = () => {
    if (recognition && recognitionActive) {
      recognition.stop();
      setRecognitionActive(false);
    }
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setTempTranscript(finalTranscript);
        setFullTranscript((prevTranscript) => prevTranscript + finalTranscript);
      }

      document.getElementById("interim").innerHTML = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
    };

    setRecognition(recognition);
  }, []);
  return (
    <div>
      <button
        style={{
          width: "100px",
          height: "100px",
          display: "block",
          margin: "0 auto",
          background: paused ? "red" : "green",
        }}
        onClick={async () => {
          setPaused(!paused);
          if (!paused) {
            startRecognition();
          } else {
            stopRecognition();
            await finalAnswer();
          }
        }}
      ></button>
      <div id="interim"></div>
      <div>{fullTranscript}</div>
    </div>
  );
}
