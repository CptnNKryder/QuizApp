// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import questions from '../data/Questions.json';
import Timer from './Timer';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => parseInt(localStorage.getItem('currentQuestionIndex')) || 0);
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('answers')) || []);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [currentQuestionIndex, answers]);

  const handleAnswer = (choice) => {
    const correctAnswer = questions[currentQuestionIndex].answers;
    setFeedback(choice === correctAnswer ? 'Correct!' : 'Incorrect!');
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, choice }]);
    setTimeout(() => {
      setFeedback('');
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const handleTimeUp = () => {
    setQuizCompleted(true);
  };

  if (quizCompleted) {
    return (
      <div className="quiz-completed">
        <h2>Quiz Completed</h2>
        <p>Your answers have been submitted.</p>
        <p>plz press 'esc' to exit</p>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <Timer duration={600} onTimeUp={handleTimeUp} />
      <h2>{question.question}</h2>
      <TransitionGroup className="choices">
        {question.choices.map((choice, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            <button onClick={() => handleAnswer(choice)}>{choice}</button>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {feedback && <p className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>{feedback}</p>}
    </div>
  );
};

export default Quiz;



