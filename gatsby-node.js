/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

async function createPages({ actions, graphql }) {
  const { data } = await graphql(`
    {
      fauna {
        allQuizzes(_size: 100) {
          data {
            question
            choices
            image
            _id
          }
        }
      }
    }
  `)

  data.fauna.allQuizzes.data.forEach(quiz => {
    const id = quiz._id
    actions.createPage({
      path: `/quiz/${id}`,
      component: require.resolve(`./src/components/quiz-page.js`),
      context: quiz,
    })
  })
}

exports.createPages = createPages
