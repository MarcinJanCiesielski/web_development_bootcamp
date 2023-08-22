// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import { createRoot } from "react-dom/client";
import cars from "./practice.js";

const container = document.getElementById("root");
const root = createRoot(container);

const [honda, tesla] = cars;

console.log(honda);
console.log(tesla);

const { speedStats: { topSpeed: hondaTopSpeed }, coloursByPopularity: [hondaTopColour] } = honda;
const { speedStats: { topSpeed: teslaTopSpeed }, coloursByPopularity: [teslaTopColour] } = tesla;

root.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
