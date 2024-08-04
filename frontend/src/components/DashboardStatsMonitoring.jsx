import React, { useEffect, useState } from "react";
import CodeExecutionTimer from "./ObservabilityCard";
import { Table } from "antd";

const DashboardStatsMonitoring = () => {
  const [code, setCode] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [result, setResult] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  const columns = [
    {
      title: "Instance ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ms CPU Time",
      dataIndex: "cpuTime",
      key: "cpuTime",
    },
  ];

  const executeCode = () => {
    try {
      const startTime = performance.now();

      // Evaluate the code
      const result = eval(code);

      const endTime = performance.now();
      const timeTaken = endTime - startTime;

      setExecutionTime(timeTaken);
      setResult(result);
      const newResult = {
        id: data.length + 1,
        cpuTime: Math.floor(Math.random() * 1000), // Example CPU time
      };
      setData([...data, newResult]);
      setResult(newResult);
    } catch (error) {
      setData([]);
      setResult(`Error: ${error.message}`);
      setExecutionTime(null);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const pasteCode = async () => {
    const text = await navigator.clipboard.readText();
    setCode(text);
  };

  return (
    <div>
      <CodeExecutionTimer
        code={code}
        setCode={setCode}
        executionTime={executionTime}
        result={result}
        executeCode={executeCode}
        copyCode={copyCode}
        pasteCode={pasteCode}
      />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default DashboardStatsMonitoring;
