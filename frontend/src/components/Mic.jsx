import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { Collapse } from "antd";

export const domain = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_URL
  : import.meta.env.VITE_LOCAL_URL;

export default function MicTest({ codeInput, onResponse }) {
  const [fullTranscript, setFullTranscript] = useState("");
  const [paused, setPaused] = useState(false);
  const [tempTranscript, setTempTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [isTracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);

  const items = [
    {
      key: "1",
      label: "Transcript",
      children: (
        <p>
          <div id="interim"></div>
          {fullTranscript}
        </p>
      ),
    },
  ];

  const toggleTracking = () => {
    setTracking(!isTracking);
  };

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

  const sendDataToDucky = async () => {
    setLoading(true);
    var response = axios
      .post("http://localhost:5005/generate-suggestions", {
        query: codeInput,
        transcribed: fullTranscript,
      })
      .then((response) => {
        // console.log(response.data);
        if (onResponse) {
          onResponse(response.data); // Call the callback function with response data
        }
      });

    setLoading(false);
  };
  return (
    <div>
      <Button
        className={`text-white px-4 py-2 rounded-lg ml-auto bg-orange-600 hover:bg-green-700${
          isTracking
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={toggleTracking}
      >
        {isTracking ? "Stop Tracking" : "Start Tracking"}
      </Button>
      <Button
        primary
        disabled={isTracking}
        loading={loading}
        className={`text-white px-4 py-2 rounded-lg ml-auto ${
          paused
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } ml-5`}
        onClick={async () => {
          setPaused(!paused);
          if (!paused) {
            startRecognition();
          } else {
            stopRecognition();
            await sendDataToDucky();
            setFullTranscript("");
          }
        }}
      >
        {paused ? "Stop Recording" : "Start Recording"}
      </Button>

      <Collapse
        style={{ margin: "10px 0" }}
        ghost
        items={items}
        defaultActiveKey={["1"]}
      />
    </div>
  );
}
