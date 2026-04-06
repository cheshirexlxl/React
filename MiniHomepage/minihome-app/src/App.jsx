import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginContextProvider from './contexts/LoginContextProvider'
import ProtectedRoute from './components/common/ProtectedRoute'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Guestbook from './pages/Guestbook'
import Room from './pages/Room'
import User from './pages/User'
import Login from './pages/Login'
import Join from './pages/Join'

function App() {

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/room" element={
            <ProtectedRoute roles={['ROLE_ADMIN']}>
              <Room />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}>
              <User />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path='/join' element={<Join />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App
