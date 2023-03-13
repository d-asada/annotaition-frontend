import React from "react";
import "./Result.css";

function Result({ result }) {
  console.log(result);
  return (
    <div className="Result">
      <h2>Result</h2>
      <table>
        <thead>
          <tr>
            <th className="Text">Text</th>
            <th className="Label">Label</th>
            <th className="Reason">Reason</th>
            <th className="Score">Score</th>
          </tr>
        </thead>
        <tbody>
          {result.map(({ text, label, reason, score }, index) => (
            <tr key={index}>
              <td>{text}</td>
              <td>{label}</td>
              <td>{reason}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
