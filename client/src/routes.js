// import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import { LinksPage } from './pages/LinksPage';


const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/links' exact element={<LinksPage/>}>
        </Route>
        <Route path='/create' exact element={<CreatePage />}>
        </Route>
        <Route path='/detail/:id' exact element={<DetailPage />}>
        </Route>
        <Route path="/*" element={<Navigate replace to="/create" />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path='/auth' exact element={<AuthPage />}>
      </Route>
      <Route path="/*" element={<Navigate replace to="/auth" />} />
    </Routes>
  )
}

export default useRoutes
