import React, { cloneElement } from "react";
import Entry from "./Entry"
import emojis from "../emojipedia";


function createEntry(emji) {
  return (
    <Entry
      key={emji.id}
      emoji={emji.emoji}
      name={emji.name}
      meaning={emji.meaning}
    />);
};

console.log(emojis);

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {emojis.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
