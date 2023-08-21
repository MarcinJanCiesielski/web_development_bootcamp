import React, { useState } from "react";

function App() {
  const [time, setTime] = useState("TIME")
  
  function updateTime() {
    let currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
    setTime(currentTime);
  };

  setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
