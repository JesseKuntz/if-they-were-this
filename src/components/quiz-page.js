import React from 'react';
import PropTypes from 'prop-types';

import SEO from './seo';
import Quiz from './quiz';
import HomeLink from './home-link';

import './layout.css';

import { useResizeHandler } from '../support/use-resize-handler';

const QuizPage = quiz => {
  useResizeHandler();

  return (
    <>
      <SEO
        title={`If They Were This | ${quiz.pageContext.name}`}
        description={`Pick what you think ${quiz.pageContext.name} is the most like!`}
      />
      <Quiz quiz={quiz.pageContext} singleQuiz={true} />
      <HomeLink />
    </>
  );
};

QuizPage.propTypes = {
  quiz: PropTypes.object,
};

export default QuizPage;
