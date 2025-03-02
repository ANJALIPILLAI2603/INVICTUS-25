import React, { useState } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import Papa from "papaparse";
import "./DatasetExploration.css";

const DatasetExploration = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [missingValues, setMissingValues] = useState({});
  const [numericColumns, setNumericColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setData(result.data);
          analyzeDataset(result.data, result.meta.fields);
        },
      });
    }
  };

  // Analyze dataset for missing values and numeric columns
  const analyzeDataset = (data, columns) => {
    const missingValuesCount = {};
    const numericCols = [];

    columns.forEach((col) => {
      const missing = data.filter((row) => row[col] === null || row[col] === "").length;
      missingValuesCount[col] = missing;

      // Check if the column is numeric
      if (data.some((row) => typeof row[col] === "number")) {
        numericCols.push(col);
      }
    });

    setMissingValues(missingValuesCount);
    setColumns(columns);
    setNumericColumns(numericCols);
    setSelectedColumn(numericCols[0] || ""); // Default to the first numeric column
  };

  // Generate bar chart data for a selected numeric column
  const generateBarChartData = () => {
    if (!selectedColumn) return [];

    const columnData = data.map((row) => row[selectedColumn]);
    const uniqueValues = [...new Set(columnData)];
    return uniqueValues.map((value) => ({
      name: value,
      count: columnData.filter((v) => v === value).length,
    }));
  };

  return (
    <div className="dataset-exploration">
      <h1>One-Click AI Dataset Auto-Exploration</h1>
      <p>Upload a dataset to analyze missing values, trends, and visualize data.</p>

      {/* File Upload */}
      <div className="file-upload">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      {/* Display Missing Values */}
      {columns.length > 0 && (
        <div className="missing-values">
          <h2>Missing Values</h2>
          <ul>
            {columns.map((col) => (
              <li key={col}>
                {col}: {missingValues[col]} missing values
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Numeric Columns */}
      {numericColumns.length > 0 && (
        <div className="numeric-columns">
          <h2>Numeric Columns</h2>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            {numericColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Bar Chart for Selected Numeric Column */}
      {selectedColumn && (
        <div className="chart-container">
          <h2>Distribution of {selectedColumn}</h2>
          <BarChart width={600} height={300} data={generateBarChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      )}

      {/* Pie Chart for Missing Values */}
      {columns.length > 0 && (
        <div className="chart-container">
          <h2>Missing Values Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={columns.map((col) => ({
                name: col,
                value: missingValues[col],
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default DatasetExploration;