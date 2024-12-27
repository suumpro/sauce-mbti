import React, { useState, useEffect } from "react";
import { loadCSV } from "./utils";
import Question from "./components/Question";
import Result from "./components/Result";
import './App.css';     // Specific styles, loaded last

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    loadCSV("/data/questions.csv")
      .then((data) => {
        if (data.length === 0) {
          console.error("Questions CSV is empty!");
          return;
        }
        setQuestions(data);
      })
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = (value) => {
    // Save the current answer
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  
    // Proceed to the next question or result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (Object.keys(answers).length === questions.length) {
      const confirmProceed = window.confirm("Are you sure you want to see your results?");
      if (confirmProceed) {
        setIsComplete(true);
      }
    } else {
      console.error("Not all questions are answered");
    }
  };

  const handleShowResult = () => {
    if (Object.keys(answers).length === questions.length) {
      setIsComplete(true);
    } else {
      console.error("Not all questions are answered");
      alert("Please answer all questions before proceeding to the results.");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-blue-100 to-green-100 p-4">
      {isComplete ? (
        <Result answers={answers} questions={questions} onRestart={handleRestart} />
      ) : questions.length > 0 ? (
        <Question
        question={questions[currentQuestion]}
        onAnswer={(value) => setAnswers((prev) => ({ ...prev, [currentQuestion]: value }))}
        onPrevious={handlePrevious}
        onNext={handleNext} // Pass updated handleNext
        current={currentQuestion + 1}
        total={questions.length}
        currentAnswer={answers[currentQuestion]}
      />
      ) : (
        <p className="text-center text-red-500">Loading questions...</p>
      )}
    </div>
  );
}

export default App;