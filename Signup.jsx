import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import GithubLogin from "react-github-login";  // Import the GitHub login component
import axios from "axios";
import "./Signup.css"; // Add your CSS file

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "" });
  const [isLogin, setIsLogin] = useState(false); // toggle between signup/login
  const [user, setUser] = useState(null);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const route = isLogin ? "signin" : "signup";

    try {
      const res = await axios.post(`http://localhost:5000/${route}`, formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error("Auth failed:", err);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const res = await axios.post("http://localhost:5000/signup", {
      token: response.credential,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const handleGithubSuccess = async (response) => {
    const res = await axios.post("http://localhost:5000/github-signin", {
      token: response.code,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  return (
    <div className="auth-container fade-in">
      <h2>{isLogin ? "Login" : "Signup"} Form</h2>
      {!user ? (
        <>
          <form onSubmit={handleFormSubmit}>
            {!isLogin && (
              <input type="text" name="name" placeholder="Name" onChange={handleInput} required />
            )}
            <input type="email" name="email" placeholder="Email" onChange={handleInput} required />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required />
            <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          </form>

          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="switch-btn">
              Switch
            </button>
          </p>

          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Google Login Failed")} />

          {/* GitHub Login */}
          <GithubLogin
            clientId="Ov23li6B7hcF2wHqKU1Y"
            redirectUri="http://localhost:5000/github-signin"  
            scope="user:email"// Set the correct redirect URL here
            onSuccess={handleGithubSuccess}
            onFailure={(err) => console.log("GitHub Login Failed", err)}
          />
        </>
      ) : (
        <div className="profile fade-in">
          <h3>Welcome, {user.name}!</h3>
          <img src={user.picture} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Signup;
