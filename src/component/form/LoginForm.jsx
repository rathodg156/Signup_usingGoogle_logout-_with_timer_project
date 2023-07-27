import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // form input validation
    if (email === "") {
      window.alert("Email field is required");
    } else if (!email.includes("@") || !email.includes(".com")) {
      window.alert("Please enter a valid email address");
    } else if (password === "") {
      window.alert("Password field is required");
    } else if (password.length < 7) {
      window.alert("Password length should be more than 7 characters");
    } else {
      // Pass the user login credentials to the parent component
      onSubmit({ email, password });
      // Clear form fields after successful login
      setEmail("");
      setPassword("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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

      <button className="login-btn" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
