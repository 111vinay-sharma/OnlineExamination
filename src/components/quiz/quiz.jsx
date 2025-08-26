// Quiz.js
import React, { useState, useEffect } from "react";
import data from "../data.json";
import "./quiz.css";
import Result from "../result/result";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Quiz({ userName }) {
  const navigate = useNavigate();
  const [question, setquestion] = useState();
  let [current, setcurrent] = useState(0);
  const [options, setoptions] = useState([]);
  const [selectoptions, setelectoptions] = useState(null);
  const [selectAns, setSelectAns] = useState([]);
  const [timer, setTimer] = useState(30);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    setquestion(data[current].question);
    setoptions(data[current].options);
    setelectoptions(selectAns[current] || null);
    setTimer(60);
    setVisitedQuestions((prev) =>
      prev.includes(current) ? prev : [...prev, current]
    );
  }, [current]);

  useEffect(() => {
    if (timer <= 0) {
      alert("Time's up!");
      getNext();
      return;
    }
    const interval = setInterval(() => {
      setTimer((counter) => counter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const createPopup = (score) => {
    const swalWithCustomButtons = Swal.mixin({
      customClass: {
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
      },
      buttonsStyling: false, // important to apply custom styles
    });

    swalWithCustomButtons
      .fire({
        title: "Are you sure?",
        text: "Do you want to submit the Quiz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, continue quiz!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // ✅ Save result in localStorage
          localStorage.setItem(
            "quizResult",
            JSON.stringify({
              score,
              totalQuestions: data.length,
              userName,
            })
          );
          swalWithCustomButtons
            .fire({
              title: "Submitted!",
              text: "Your quiz has been submitted.",
              html: `<p>Your quiz has been submitted.</p><p>Your Score is : <strong>${score}/${data.length}</strong></p>`,
              icon: "success",
              confirmButtonText: "See result",
            })
            .then((data) => {
              if (data.isConfirmed) {
                navigate("/result");
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  };

  function getNext() {
    if (current < data.length - 1) {
      setcurrent(current + 1);
    } else {
      alert("No more questions! you can submit your Quiz");
      setcurrent(0);
    }
  }

  function getPrev() {
    if (current > 0) {
      setcurrent(current - 1);
    }
  }

  function handleOnchange(option) {
    setelectoptions(option);
    const updatedAns = [...selectAns];
    updatedAns[current] = option;
    setSelectAns(updatedAns);

    setAnsweredQuestions((prev) =>
      prev.includes(current) ? prev : [...prev, current]
    );
  }

  function result() {
    let score = 0;
    selectAns.forEach((ans, index) => {
      if (ans === data[index].answer) {
        score++;
      }
    });

    // save to local storage
    createPopup(score);
    setcurrent(0);
  }

  function getQuestion(index) {
    setcurrent(index);
  }

  return (
    <section>
      <Helmet>
        <title>Quiz App - Quiz</title>
        <meta name="description" content="Test your knowledge with our quiz" />
        
      </Helmet>
      <div className="container">
        <h2 className="greeting">
          👋 Hey <span className="username">{userName}</span>, ready to test
          your brain power?
        </h2>
        <div className="quiz-layout">
          <div className="quiz-container">
            <p className="timer">⏱️ Time Left: {timer} seconds</p>
            <h3>
              Q{data[current].questionNo}: {question}
            </h3>

            {options.map((option) => (
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selectoptions === option}
                  onChange={() => handleOnchange(option)}
                />
                {option}
              </label>
            ))}

            <div className="buttons_cont">
              <button
                onClick={getPrev}
                disabled={current === 0}
                className="prevBtn footerBtn"
              >
                Prev
              </button>
              <button onClick={result} className="submitBtn footerBtn">
                Submit Quiz
              </button>
              <button onClick={getNext} className="nextBtn footerBtn">
                Next
              </button>
            </div>
          </div>

          <div className="quiz_sidebar">
            <h1>Questions</h1>
            <div className="flex">
              {data.map((button, index) => {
                let btnClass = "sidebarBtn";

                if (answeredQuestions.includes(index)) {
                  btnClass += " answered";
                } else if (current === index) {
                  btnClass += " active";
                } else if (visitedQuestions.includes(index)) {
                  btnClass += " visited";
                }

                return (
                  <button
                    key={index}
                    onClick={() => getQuestion(index)}
                    className={btnClass}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Quiz;
