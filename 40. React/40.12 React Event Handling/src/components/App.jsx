import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [backgroundColor, setBackgroundColor] = useState({});
  const [isMouseOver, setMouseOver] = useState(false);

  function submitted() {
    setHeadingText("Submitted");
  }

  function blackBackground() {
    setBackgroundColor({ backgroundColor: "black" });
  }

  function whiteBackground() {
    setBackgroundColor({ backgroundColor: "white" });
  }

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: isMouseOver ? "black" : "white" }}
        onClick={submitted}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
