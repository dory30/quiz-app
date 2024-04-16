// src/ResultScreen.js
import React from 'react';

const ResultScreen = ({ score, questions, onRetry }) => {
  const scorePercentage = (score / questions.length) * 100;
  const passed = scorePercentage >= 50; // Définit le seuil de réussite à 50%, ajustez selon vos critères
  const emoji = passed ? '🎉' : '😢';

  return (
    <div className="result-screen">
      <h2>Quiz Results {emoji}</h2>
      <p>Nice job, {passed ? 'you passed!' : 'try again!'}</p>
      <div className="result-cards">
        <div className="result-card">
          <h3>YOUR SCORE</h3>
          <p>{scorePercentage}%</p>
          <p>PASSING SCORE: 50%</p>
        </div>
        <div className="result-card">
          <h3>YOUR POINTS</h3>
          <p>{score} / {questions.length}</p>
          <p>PASSING POINTS: {Math.ceil(questions.length / 2)}</p>
        </div>
      </div>
      <button onClick={onRetry}>Review Quiz</button>
    </div>
  );
};

export default ResultScreen;
