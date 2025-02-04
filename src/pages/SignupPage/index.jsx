import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../apiKey";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import styles from "./SignupPage.module.css";

// const API_URL = "http://localhost:5005";
// const API_URL = "https://scoretwce-backend.onrender.com";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  // const handleBirthday = (e) => setBirthday(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      firstName,
      lastName,
      gender,
      birthday,
    };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1 className="textCenter">Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className={styles.signupForm}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>First Name:</label>
        <input
          type="text"
          name="name"
          value={firstName}
          onChange={handleFirstName}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="name"
          value={lastName}
          onChange={handleLastName}
        />

        <label>Date of Birth:</label>
        <DatePicker
          value={birthday}
          onChange={setBirthday}
          dateFormat="yyyy-MM-dd"
        />

        <label>Gender:</label>
        <select name="gender" value={gender} onChange={handleGender}>
          <option value="">Select your gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

        <button type="submit" className="buttonRed fullWidth">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}
//

export default SignupPage;
