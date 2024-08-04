import React from "react";
import { data } from "./data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DataTable = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Instance ID </th>
            <th>vs CPU Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.cpuTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Graph data={data} />
    </div>
  );
};

const Graph = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 30, right: 10, left: 20, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="cpuTime"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default DataTable;
