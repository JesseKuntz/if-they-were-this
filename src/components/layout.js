import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import QuizContainer from './quiz-container';
import ResultsPage from './results-page';

const SITE_TITLE = 'If They Were This';

const Layout = ({ children, quizzes, hideSplash }) => {
  const [quizResults, setQuizResults] = useState();

  return (
    <>
      <div className="turn text">
        Please turn the screen back to portrait mode to keep playing!
      </div>
      {!hideSplash && <Header siteTitle={SITE_TITLE} />}
      <div
        style={{
          margin: `0 auto`,
          padding: `0 20px`,
        }}
        className="scroll-piece"
      >
        {children}
      </div>
      <QuizContainer
        quizzes={quizzes}
        quizResults={quizResults}
        setQuizResults={setQuizResults}
      />
      <ResultsPage quizResults={quizResults} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  quizzes: PropTypes.object,
  hideSplash: PropTypes.bool,
};

export default Layout;
