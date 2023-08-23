import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event){
    const {value, name} = event.target;

    setContact((previousState) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: previousState.lName,
          email: previousState.email
        }
      } else if (name === "lName") {
        return {
          fName: previousState.fName,
          lName: value,
          email: previousState.email
        }
      } else if (name === "email") {
        return {
          fName: previousState.fName,
          lName: previousState.lName,
          email: value
        }
      }
    })
  };

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange} />
        <input name="lName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
