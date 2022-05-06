import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import 'materialize-css'
import useRoutes from './routes.js'


function App() {
  const routes = useRoutes(false)
  return (
    // <Router>
      <div className="container">
        Hello
      </div>
    // </Router>
  )
}

export default App
