// import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/LinksPage';


// window.React1 = require('react');

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
console.log(window.React2 === window.React3);
console.log(window.React1 === window.React3);


const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/links' exact>
           <LinksPage/>
        </Route>
        <Route path='/create' exact>
          <DetailPage/>
        </Route>
        <Route path='/detail/:id' exact>
          <CreatePage />
        </Route>
        <Navigate to="/create"/>
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Navigate to='/'/>
    </Routes>
  )
}

export default useRoutes
