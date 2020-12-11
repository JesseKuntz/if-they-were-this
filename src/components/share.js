import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as clipboard from 'clipboard-polyfill/text'

import { slugify } from '../support/slugify'

function clickHandler(name, setCopied) {
  const textToWrite = `${window.location.href}quiz/${slugify(name)}`

  clipboard.writeText(textToWrite)

  setCopied(true)

  window.setTimeout(() => {
    setCopied(false)
  }, 1000)
}

function getClass(copied) {
  const baseClass = 'copy-message'

  if (copied) {
    return `${baseClass} show`
  }

  return baseClass
}

function Share({ name }) {
  const [copied, setCopied] = useState()

  return (
    <div className="icon-container">
      <div className="share" onClick={() => clickHandler(name, setCopied)}>
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="share-icon"
        >
          <path
            fill="currentColor"
            d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"
          ></path>
        </svg>
      </div>
      <div className={getClass(copied)}>Link Copied!</div>
    </div>
  )
}

Share.propTypes = {
  name: PropTypes.string,
}

export default Share
