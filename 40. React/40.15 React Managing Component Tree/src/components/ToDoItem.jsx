import React, { useState } from "react";

function ToDoItem(props) {
  const [isDone, setIsDone] = useState(false);

  return (
    <li
      onClick={() => {
        props.onChecked(props.id)
      }}
      style={{ textDecoration: isDone ? "line-through" : "none" }}
    >
      {props.text}
    </li>
  );
}

export default ToDoItem;
