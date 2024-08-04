import React, { useState } from "react";
import CardGrid from "./CardGrid";
import DashboardStatsMonitoring from "./DashboardStatsMonitoring";
import DataTable from "./DataTable";

const TrackingStatsToggle = () => {
  const [activeTab, setActiveTab] = useState("codep");
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
              activeTab === "codep"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("codep")}
          >
            Code Performance Monitor
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "weekly"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("weekly")}
          >
            Observability Monitor (Prototype)
          </button>
        </div>
      </div>

      <div className="p-6 bg-white shadow-xl rounded-lg">
        {activeTab === "codep" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Code Monitor</h3>
            <DashboardStatsMonitoring />
          </div>
        )}
        {activeTab === "weekly" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Code Graph</h3>
            <DataTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingStatsToggle;
