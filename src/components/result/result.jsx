// Result.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./result.css";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizResult"));
    if (data) {
      setResult(data);

      // Trigger confetti for good scores
 
        confetti({
          particleCount: 300,
          spread: 100,
          origin: { y: 0.6 },
        });
      
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!result) return null;

  const { userName, score, totalQuestions } = result;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return "You're a genius! 🚀";
    if (percentage >= 80) return "Awesome work! 🎉";
    if (percentage >= 60) return "Great job! 🙌";
    if (percentage >= 40) return "Keep practicing! 💪";
    return "Don't give up! 🌱";
  };

  return (
    <div className="result-page">
      <div className="glass-card">
        <h1 className="gradient-text">🎓 Quiz Result new changes</h1>
        <h2>Hey {userName},</h2>
        <p className="message">{getMessage()}</p>

        <div className="circle-progress">
          <svg>
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>
            <circle cx="70" cy="70" r="60"></circle>
            <circle
              cx="70"
              cy="70"
              r="60"
              style={{ strokeDashoffset: 377 - (377 * percentage) / 100 }}
            ></circle>
          </svg>
          <div className="percentage">{percentage}%</div>
        </div>

        <p className="score-details">
          You scored <strong>{score}</strong> out of{" "}
          <strong>{totalQuestions}</strong>
        </p>

        <blockquote className="quote">
          “Success is the sum of small efforts, repeated day in and day out.” 💡
        </blockquote>

        <button className="retake-btn" onClick={() => navigate("/")}>
          🔁 Retake Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
