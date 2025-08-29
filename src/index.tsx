import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SetupQuiz from './Pages/SetupQuiz';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import Quiz from './Pages/Quiz';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/quiz" element={<Quiz/>} />
        <Route path="/" element={<Home />} />
        <Route path="/setup-quiz" element={<SetupQuiz />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
