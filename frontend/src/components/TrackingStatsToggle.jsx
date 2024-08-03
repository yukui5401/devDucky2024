import React, { useState } from "react";
import CardGrid from "./CardGrid";

const TrackingStatsToggle = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [isTracking, setIsTracking] = useState(true);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    // Add any additional logic needed to start or stop tracking
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="inline-flex border-b border-gray-300">
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "daily"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("daily")}
          >
            Daily
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "weekly"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "monthly"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
        </div>
        <button
          className={`text-white px-4 py-2 rounded-lg ${
            isTracking
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handleToggleTracking}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>
      </div>

      <div className="p-6 bg-white shadow-xl rounded-lg">
        {activeTab === "daily" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Daily Stats</h3>
            <p className="text-gray-600">Here are the daily stats...</p>
            <CardGrid />
          </div>
        )}
        {activeTab === "weekly" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Weekly Stats</h3>
            <p className="text-gray-600">Here are the weekly stats...</p>
            <CardGrid />
          </div>
        )}
        {activeTab === "monthly" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Monthly Stats</h3>
            <p className="text-gray-600">Here are the monthly stats...</p>
            <CardGrid />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingStatsToggle;
