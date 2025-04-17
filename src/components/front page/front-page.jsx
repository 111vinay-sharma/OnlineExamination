// FrontPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../front page/front-page.css";

function FrontPage({ setUserName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <form className="login_form">
        <h1 className="title">🔐 Login to Start Quiz</h1>
        <p className="subtitle">Please enter your credentials</p>
        <input
          type="text"
          placeholder="user Name."
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
        <label htmlFor="" className="custom-checkbox">
          <input type="checkbox"  className = 'checkbox'/>
          <p className="checkbox-label">I agree to the <span>Terms & Conditions</span></p>
        </label>
        <button onClick={() => handleStart()} className="start-btn">
          Login & Start
        </button>
      </form>
    </div>
  );
}

export default FrontPage;
