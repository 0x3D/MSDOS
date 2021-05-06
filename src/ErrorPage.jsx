import React from 'react'

/**
 * This get rendered if a page can't be found
 * @returns A simple error page.
 */
export default function ErrorPage () {
  return (
    <div style={{ margin: '50px' }}>
      <h2>Sidan hittades inte...</h2>
    </div>
  )
}
