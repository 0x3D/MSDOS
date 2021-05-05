import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import Footer from './components/Footer'

/**
 * Renders the hole thing
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
)
