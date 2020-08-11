import React, { useState } from "react";

function Form() {
  //****************** Setting state ******************
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  //****************** Setting state ******************

  return (
    <form className="form">
      <label htmlFor="name">
        Name
        <input className="input"></input>
      </label>
      <label htmlFor="email">
        Email
        <input className="input"></input>
      </label>
      <label htmlFor="password">
        Password
        <input className="input"></input>
      </label>
      <button className="button" disabled={buttonDisabled} type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
