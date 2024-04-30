import React, { useState } from 'react';
import ResultScreen from './ResultScreen';
import quizData from './quizData';
import './App.css';

function App() {

  // Define state variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Function  to shuffle an array
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // As long as there are still elements to mix...
    while (0 !== currentIndex) {

      // Select a remaining item...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And exchange it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const retryQuiz = () => {
    // Reset quiz status
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
    setIsCorrect(false);

    // Mix up the questions
    const shuffledQuizData = shuffle(quizData);

    // Mix options for each question
    shuffledQuizData.forEach(question => {
      question.options = shuffle(question.options);
    });
  };

  const handleOptionClick = (option) => {
    const correct = option === quizData[currentQuestionIndex].answer;
    setSelectedOption(option);
    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleSubmitClick = () => {
    if (!isCorrect) {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedOption("");
        setIsCorrect(null);
      }
      else {
        setShowScore(true);
      }
    }
    else {
      // If the answer is correct, move on to the next question.
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
        ${selectedOption === option ? (isCorrect ? "correct" : "incorrect") : ""}
        ${isAnswered && !isCorrect && quizData[currentQuestionIndex].answer === option ? "correct-answer-blink" : ""}`}
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
