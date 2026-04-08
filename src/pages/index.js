import React, { useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import GenerateQuizzesButton from '../components/generate-quizzes-button';
import Navigate from '../components/navigate';

import { useResizeHandler } from '../support/use-resize-handler';

const QUIZ_SIZES = [10, 25, 50, 100];

export default function IndexPage() {
  const [quizzes, setQuizzes] = useState();
  const [loading, setLoading] = useState(false);

  useResizeHandler();

  async function fetchQuizzes(size) {
    setLoading(true);
    const res = await fetch('/api/quizzes');
    const data = await res.json();
    setQuizzes({ data, quizSize: size });
    setLoading(false);
  }

  return (
    <Layout quizzes={quizzes}>
      <SEO />
      <div className="text">
        <span className="bold-brand">If They Were This</span> is a celebrity
        quiz game.
      </div>
      {loading ? (
        <img src="/icon.svg" className="loading-indicator" alt="Loading" />
      ) : quizzes ? (
        <>
          <div className="text">Your quiz awaits, scroll away!</div>
          <Navigate start={true} />
        </>
      ) : (
        <>
          <div className="text">
            Pick the number of questions you want in your quiz:
          </div>
          <div className="quiz-size-button-container">
            {QUIZ_SIZES.map(size => (
              <GenerateQuizzesButton
                key={size}
                fetchQuizzes={fetchQuizzes}
                size={size}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
