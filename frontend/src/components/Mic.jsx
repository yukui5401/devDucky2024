import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Button } from "antd";

const Mic = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = useRef(null);

  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          mediaRecorderRef.current = recorder;

          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };

          recorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: "audio/wav" });
            saveAudioLocally(blob);
            saveAudioToServer(blob);
            setAudioChunks([]);
          };

          recorder.start();
        })
        .catch((error) => console.error("Error accessing microphone:", error));
    } else if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const saveAudioToServer = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to upload audio");
      }

      console.log("Audio uploaded successfully");
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const saveAudioLocally = (blob) => {
    saveAs(blob, "recording.wav");
  };

  return (
    <div>
      <Button
        className={`text-white px-4 py-2 rounded-lg ml-auto mr-6 bg-orange-600 hover:bg-green-700${
          isTracking
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={handleToggleTracking}
      >
        {isTracking ? "Stop Tracking" : "Start Tracking"}
      </Button>
      <Button
        onClick={startRecording}
        disabled={isTracking}
        className="text-white px-4 py-2 rounded-lg ml-auto mr-6 bg-green-600 hover:bg-green-700"
      >
        {isRecording ? "RECORDING" : "MIC OFF"}
      </Button>
      <Button
        onClick={stopRecording}
        disabled={isTracking}
        name="stop"
        className="text-white px-4 py-2 rounded-lg ml-auto mr-6 bg-red-600 hover:bg-red-700"
      >
        Stop
      </Button>
      <audio id="audio" controls style={{ display: "none" }}></audio>
    </div>
  );
};

export default Mic;
