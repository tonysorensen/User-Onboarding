import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Button } from "reactstrap";
import Users from "./Users";
function Form() {
  //********** Begin Setting state **********

  //for incoming forms
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: false,
  });

  //controls whether form can be submitted (see useEffect)
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //manages state for errors inline validation set in validateInput with yup will update to have an error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: "",
  });

  // server error
  const [serverError, setServerError] = useState("");

  //users state initialized with an empty array. When a POST request is made state is updated with a new user added to the array and rendered in the app.
  const [users, setUsers] = useState([]);
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
  const [option, setOption] = React.useState(null);
  //********** Begin onSubmit function **********
  const formSubmit = (e) => {
    e.preventDefault(); //prevents the attempt to submit the form to the server
    console.log("form submitted");

    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log("success", res.data); // Verify using a `console.log()` that you are receiving a successful response back from POST request

        //using spread to add new members to array

        // update state with value from API to display in <pre>
        setUsers([...users, res.data]);

        console.log("users array", users);
        // if successful request, clear any server errors
        setServerError(null); // see step 7 in notion notes

        //clear state

        setFormState({
          name: "",
          email: "",
          password: "",
          role: "",
          terms: false,
        });
      })
      .catch((err) => {
        setServerError("There was an error retreiving data");
        console.log(err);
      });
  };

  //********** End onSubmit function **********

  //********** Begin onChange function **********
  const inputChange = (e) => {
    // use persist with async code -> we pass the event into validateChange that has async promise logic with .validate necessary because we're passing the event asyncronously and we need it to exist even after this function completes (which will complete before validateChange finishes)
    e.persist();
    console.log("input changed", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e); //does inline validation for each change to the form
    setFormState(newFormData); //updates the state with the new data
  };

  //********** End onChange function **********

  //********** Begin yup validation (errors if input is NOT valid) **********
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email")
      .notOneOf(["waffle@syrup.com"], "That email is already taken"),
    //set password required and minimum length of 8 characters
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters"),
    role: yup
      .string()
      .oneOf(
        [
          "Front-End Developer",
          "Back-End Developer",
          "Web UI/Design",
          "Data Science",
        ],
        "Please Select A Role"
      ),

    terms: yup
      .boolean()
      .oneOf([true], "Please agree to the terms and conditions"),
  });
  //********** End yup validation (determines if input is valid) **********

  //********** Begin useEffect  **********
  //validates entire form whenever state changes and enables submit button if changes are valid
  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [formState]);

  //********** End useEffect **********
  console.log("users array", users);
  return (
    <form className="form" onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}
      <label htmlFor="name">
        <em> Name: </em>

        <input
          data-cy="name"
          className="input"
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        <em>Email:</em>
        <input
          data-cy="email"
          className="input"
          id="email"
          type="text"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        <em>Password:</em>
        <input
          data-cy="password"
          className="input"
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <label htmlFor="role" className="text-info">
        <select
          data-cy="role"
          id="role"
          name="role"
          onChange={inputChange}
          className="text-info"
        >
          <option>Please select your role</option>
          <option value="Front-End Developer">Front-End Developer</option>
          <option value="Back-End Developer">Back-End Developer</option>
          <option value="Web UI/Design">Web UI/Design</option>
          <option value="Data Science">Data Science</option>
        </select>
        {errors.role.length > 0 ? (
          <p className="error">{errors.position}</p>
        ) : null}
      </label>
      <label htmlFor="terms" className="text-danger">
        Terms and Conditions
        <input
          data-cy="terms"
          className="checkbox"
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
      </label>
      {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
      <Button
        data-cy="submit"
        color="primary"
        size="lg"
        className="button"
        disabled={buttonDisabled}
        type="submit"
      >
        Submit
      </Button>
      <Users users={users} />
    </form>
  );
}

export default Form;
