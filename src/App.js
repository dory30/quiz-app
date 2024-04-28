import React, { useState } from 'react';
import ResultScreen from './ResultScreen';
import quizData from './quizData';
import './App.css'; // Assurez-vous de créer un fichier App.css pour le style

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);


  const retryQuiz = () => {
    // Réinitialiser l'état du quiz
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
  };

  const handleOptionClick = (option) => {
    const isAnswerCorrect = option === quizData[currentQuestionIndex].answer;
    setSelectedOption(option);
    setIsAnswered(true);
    setIsCorrect(isAnswerCorrect);
    //if (isAnswerCorrect) {
    // setScore(score + 1);
    //}
  };

  const handleSubmitClick = () => {

    if (!isCorrect) {
      setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsAnswered(false);
          setSelectedOption("");
          setIsCorrect(null);
        } else {
          setShowScore(true);
        }
      }, 2000); // Attendre 2 secondes
    } else {
      // Si la réponse est correcte, passez immédiatement à la prochaine question
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedOption("");
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }

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
                className={`option-button 
        ${selectedOption === option ? (isAnswerCorrect ? "correct" : "incorrect") : ""}
        ${isAnswerCorrect === false && quizData[currentQuestionIndex].answer === option ? "correct-answer-blink" : ""}`}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
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
