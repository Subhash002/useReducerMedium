import React, { useReducer, useState } from "react";
import "./styles.css";

const initialState = [
  { id: Date.now(), name: "Subhash Kandhway", email: "jhontesla@gmail.com" }
];
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((contact) => {
        return contact.id !== action.payload.id;
      });
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    let contact = {
      id: Date.now(),
      name,
      email
    };
    dispatch({ type: "add", payload: contact });
  };

  return (
    <div className="App">
      <h1>Hello useReducer hooks</h1>
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
      <div>
        <ul>
          {state.map((contact) => {
            return (
              <li key={contact.id}>
                <h2>{contact.name}</h2>
                <h2>{contact.email}</h2>
                <div>
                  <button
                    onClick={() =>
                      dispatch({ type: "delete", payload: { id: contact.id } })
                    }
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
