/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import smoothscroll from 'smoothscroll-polyfill'

function onClientEntry() {
  smoothscroll.polyfill()
}

export { onClientEntry }
