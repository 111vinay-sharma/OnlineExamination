import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../front page/front-page.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from "react-spinners";

function FrontPage({ setUserName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name);
      navigate("/quiz");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="frontpage">
      <div className="form_container">
        <div className="form_image">
          <img src="images/form-img.jpg" alt="Form Illustration" />
        </div>
        <form className="login_form">
          <h1 className="title">🔐 Login to Start Quiz</h1>
          <p className="subtitle">Please enter your credentials</p>
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <label className="custom-checkbox">
            <input type="checkbox" className="checkbox" />
            <p className="checkbox-label">
              I agree to the <span>Terms & Conditions</span>
            </p>
          </label>
          <button type="button" onClick={handleStart} className="start-btn">
            Login & Start
          </button>

          <GoogleOAuthProvider clientId="956715507708-aeb41l7qh4vrh5c76ljuhiq902d05n21.apps.googleusercontent.com">
            <div className="google-login-section">
              {loading && (
                <div className="spinner">
                  <ClipLoader color="#36d7b7" size={35} />
                </div>
              )}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setLoading(true);
                  const decoded = jwtDecode(credentialResponse.credential);
                  setUserName(decoded.name);
                  navigate("/quiz");
                  setLoading(false);
                }}
                onError={() => {
                  setLoading(false);
                  console.log("Login Failed");
                }}
              />
            </div>
          </GoogleOAuthProvider>
        </form>
      </div>
    </div>
  );
}

export default FrontPage;
