import React from "react";
import { useState } from "react";

const MicToggle = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    // any additional logic
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex mb-4">
        <button
          className={`text-white px-4 py-2 rounded-lg ${
            isMicOn
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleMicToggle}
        >
          {isMicOn ? "MIC ON" : "MIC OFF"}
        </button>
      </div>
    </div>
  );
};

export default MicToggle;
