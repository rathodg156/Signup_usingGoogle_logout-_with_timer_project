import React, { useEffect } from "react";
// import SignUpForm from './component/form/SignUpForm';
// import LoginForm from './component/form/LoginForm';
import Form from "./component/form/Form";
import Timer from "./component/Timer";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER, LOGIN, LOGOUT } from "./redux/actionTypes.js/actions";

const App = () => {
  const users = useSelector((state) => state.users);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignUp = (userData) => {
    dispatch({ type: ADD_USER, payload: userData });
    alert("Congratulations, Your account has been created. Proceed to login.");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    dispatch({ type: "LOGIN" });
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  const handleLogin = (loginData) => {
    const { email, password } = loginData;
    if (email === "" || !email.includes("@") || !email.includes(".com")) {
      window.alert("Please enter a valid email address");
    } else if (password === "") {
      window.alert("Password field is required");
    } else if (password.length < 7) {
      window.alert("Password length should be more than 7 characters");
    } else {
      const userdata = users;
      const userlogin = userdata.filter((el, k) => {
        return el.email === email && el.password === password;
      });
      if (userlogin.length === 0) {
        alert("Invalid details");
      } else {
        // console.log("User login successfully");
        dispatch({ type: LOGIN });
        localStorage.setItem("user_login", JSON.stringify(userlogin));
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  useEffect(() => {
    // Auto-logout logic after 60 seconds of inactivity
    let timer;
    if (isLoggedIn) {
      timer = setTimeout(() => {
        handleLogout();
      }, 60000);
    }
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return (
    <div className="container">
      <GoogleOAuthProvider clientId="Enter Your Client_ID">
        {isLoggedIn ? (
          <div>
            <h1>Welcome to the App {users.name}!</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
            <Timer onLogout={handleLogout} />
          </div>
        ) : (
          <div>
            <h1>Sign Up with Google</h1>
            <button className="google-signin-btn">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </button>
            <Form onSignUp={handleSignUp} onLogin={handleLogin} />
          </div>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
