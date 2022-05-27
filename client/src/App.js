import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import useRoutes from './routes.js'
import { useAuth } from './hooks/auth.hook.js';
import { AuthContext } from './context/AuthContext.js';
import { Navbar } from './components/Navbar.js';
import 'materialize-css'


function App() {
  const {token, userId, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  console.log("App start")
  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
