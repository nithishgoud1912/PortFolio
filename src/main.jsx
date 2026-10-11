import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import SmoothScroll from './components/SmoothScroll'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SmoothScroll><App /></SmoothScroll>
    </HashRouter>
  </React.StrictMode>,
)
