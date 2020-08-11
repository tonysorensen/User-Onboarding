import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

function Form() {
  //********** Begin Setting state **********

  //for incoming forms
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });

  //controls whether form can be submitted (see useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //manages state for errors inline validation set in validateInput with yup will update to have an error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });
  //********** End Setting state **********

  //********** Begin inline validation (determines if input is valid) **********
  //checks each key:value pair against schema to see if is is valid by grabbing the rules with e.target.name
  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) //compares the value to the rules, in the case of terms it's looking to see if it is checked rather than see if a string matches the rules. If everything checks out then erase any errors in the error state at that key:value location, if there are problems then set the error in state.
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };
  //********** End inline validation (determines if input is valid) **********

  //********** Begin yup validation (errors if input is NOT valid) **********
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"),
    //set password required and minimum length of 8 characters
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms"),
  });
  //********** End yup validation (determines if input is valid) **********

  return (
    <form className="form">
      <label htmlFor="name">
        Name
        <input className="input" id="name" type="text" name="name" />
      </label>
      <label htmlFor="email">
        Email
        <input className="input" id="name" type="text" name="email" />
      </label>
      <label htmlFor="password">
        Password
        <input className="input" id="name" type="text" name="password" />
      </label>
      <label htmlFor="terms" className="input">
        <input type="checkbox" id="terms" name="terms" />
        Terms and Conditions
      </label>
      <button className="button" disabled={buttonDisabled} type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
