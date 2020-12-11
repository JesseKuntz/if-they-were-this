/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

import { slugify } from './src/support/slugify'

async function createPages({ actions, graphql }) {
  const { data } = await graphql(`
    {
      fauna {
        allQuizzes(_size: 100) {
          data {
            question
            choices
            image
            name
            _id
          }
        }
      }
    }
  `)

  data.fauna.allQuizzes.data.forEach(quiz => {
    const slug = slugify(quiz.name)

    actions.createPage({
      path: `/quiz/${slug}`.replace(/\/\/+/g, '/'),
      component: require.resolve(`./src/components/quiz-page.js`),
      context: quiz,
    })
  })
}

exports.createPages = createPages
