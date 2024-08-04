import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const Mic = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };

          recorder.start();
        })
        .catch((error) => console.error("Error accessing microphone:", error));
    } else if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
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
    saveAs(blob, "tmp/recording.wav");
  };

  useEffect(() => {
    if (!isRecording && audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: "audio/wav" });
      saveAudioLocally(blob);
      saveAudioToServer(blob);
      setAudioChunks([]);
    }
  }, [isRecording]);

  return (
    <div>
      <button
        onClick={startRecording}
        className="text-white px-4 py-2 rounded-lg ml-auto mr-6 bg-green-600 hover:bg-green-700"
      >
        {isRecording ? "RECORDING" : "MIC OFF"}
      </button>
      <button
        onClick={stopRecording}
        name="stop"
        className="text-white px-4 py-2 rounded-lg ml-auto mr-6 bg-red-600 hover:bg-red-700"
      >
        Stop
      </button>
      <audio id="audio" controls style={{ display: "none" }}></audio>
    </div>
  );
};

export default Mic;
