import React from 'react';
import PropTypes from 'prop-types';

import Navigate from '../navigate';

function getQuizRows(quizResults) {
  return quizResults.map(result => {
    return (
      <div className="results-row" key={result.name}>
        <div className="results-data results-name">{result.name}</div>
        <div className="results-data">{result.correct ? '✅' : '❌'}</div>
      </div>
    );
  });
}

function clickHandler() {
  window.location.reload();
}

function ResultsPage({ quizResults }) {
  if (!quizResults) {
    return null;
  }

  const correctAnswers = quizResults.filter(result => result.correct);
  const percentageCorrect = Math.floor(
    (correctAnswers.length / quizResults.length) * 100
  );

  return (
    <div className="scroll-piece">
      <Navigate up={true} />
      <div className="text">Results:</div>
      <div className="percentage">{percentageCorrect}%</div>
      <div className="results-container">
        <div className="results-headers">
          <div className="results-header results-header-question">Question</div>
          <div className="results-header">Correct</div>
        </div>
        <div className="results-body">{getQuizRows(quizResults)}</div>
      </div>
      <div>
        Note: this only calculates the questions that you have actually
        completed!
      </div>
      <button className="main-button play-again-button" onClick={clickHandler}>
        Play Again
      </button>
    </div>
  );
}

ResultsPage.propTypes = {
  quizResults: PropTypes.any,
};

export default ResultsPage;
