import React from "react";
import { useState } from "react";

const MicToggle = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    // any additional logic
  };

  return (
    <button
      className={`text-white px-4 py-2 rounded-lg ml-auto mr-4 ${
        isMicOn
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
      onClick={handleMicToggle}
    >
      {isMicOn ? "MIC ON" : "MIC OFF"}
    </button>
  );
};

export default MicToggle;
