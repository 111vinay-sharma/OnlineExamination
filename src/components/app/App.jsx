// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "../quiz/quiz";
import FrontPage from "../front page/front-page";
import Result from "../result/result";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage setUserName={setUserName} />} />
        <Route path="/quiz" element={<Quiz userName={userName} />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
