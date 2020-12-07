import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

import Quiz from '../../components/quiz'
import HomeLink from '../../components/home-link'

import StarIconImage from '../../images/gatsby-icon.png'

import { useResizeHandler } from '../../support/use-resize-handler'

const QUIZ_QUERY = gql`
  query Quizzes($id: ID!) {
    findQuizByID(id: $id) {
      question
      choices
      image
    }
  }
`

const QuizPage = ({ id }) => {
  const { loading, error, data } = useQuery(QUIZ_QUERY, {
    variables: { id },
  })

  useResizeHandler()

  if (loading) {
    return <img src={StarIconImage} className="loading-indicator centered" />
  }

  if (error) {
    return navigate('/404')
  }

  return (
    <>
      <Quiz quiz={data.findQuizByID} singleQuiz={true} />
      <HomeLink />
    </>
  )
}

QuizPage.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
}

export default QuizPage
