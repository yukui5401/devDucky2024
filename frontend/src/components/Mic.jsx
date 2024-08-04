import React, { useState, useRef } from "react";
import { Button } from "antd";

const Mic = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isTracking, setIsTracking] = useState(false);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    // Add any additional logic needed to start or stop tracking
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        saveAudioLocally(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const saveAudioLocally = (blob) => {
    saveAs(blob, "recording.wav");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="m-4">
      <Button
        style={{ marginRight: "10px" }}
        disabled={isTracking}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioURL && (
        <audio src={audioURL} controls style={{ display: "none" }} />
      )}

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
    </div>
  );
};

export default Mic;
