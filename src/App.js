import React, { useState } from 'react';
import ResultScreen from './ResultScreen';
import quizData from './quizData';
import './App.css'; // Assurez-vous de créer un fichier App.css pour le style

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showScore, setShowScore] = useState ("false");

  const retryQuiz = () => {
    // Réinitialiser l'état du quiz
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Logique pour la réponse sera ajoutée ici
  };

  const handleSubmitClick = () => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Afficher le score final
    }
    setSelectedOption(""); // Réinitialiser l'option sélectionnée pour la prochaine question
  };

  return (
    <div className="App">
       {showScore ? (
        <ResultScreen score={score} questions={quizData} onRetry={retryQuiz} />
      ) : (
      <div className="quiz-container">
        <h1>Quiz App</h1>
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestionIndex + 1}</span>/{quizData.length}
          </div>
          <div className="question-text">
            {quizData[currentQuestionIndex].question}
          </div>
        </div>
        <div className="option-section">
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmitClick}>
          Next
        </button>
      </div>
       )}
    </div>
  );
}

export default App;
