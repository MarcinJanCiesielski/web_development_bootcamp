import React, {useState} from "react";

function App() {
  const [itemList, setItemList] = useState([]);
  const [inputName, setInputName] = useState("");

  function handleChange(event){
    const value = event.target.value;
    setInputName(value);
  };

  function handleClick() {
    setItemList((previousState) => {
      return [...previousState, inputName]
    })
    setInputName("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text"
        onChange={handleChange}
        value={inputName}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemList.map(item => {
            return <li>{item}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
