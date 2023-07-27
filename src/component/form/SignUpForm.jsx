import React, { useState } from "react";

const SignUpForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation if needed

    if (name === "") {
      window.alert("Name field is required");
    } else if (email === "") {
      window.alert("Email field is required");
    } else if (!email.includes("@") || !email.includes(".com")) {
      window.alert("Please enter a valid email address");
    } else if (password === "") {
      window.alert("Password field is required");
    } else if (password.length < 7) {
      window.alert(
        "Password is too short, length should be more than 7 characters"
      );
    } else {
      // Passing details to the parent component for signup
      onSubmit({ name, email, password });
      // Clear form fields after successful signup
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="btn">
        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
