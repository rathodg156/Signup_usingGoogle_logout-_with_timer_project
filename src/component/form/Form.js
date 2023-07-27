import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Form = ({ onSignUp, onLogin }) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={onSignUp} />
      <h1>Login</h1>
      <LoginForm onSubmit={onLogin} />
    </div>
  );
};

export default Form;
