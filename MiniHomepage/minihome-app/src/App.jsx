import { useState } from 'react'
import './App.css'
import './css/style.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginContextProvider from './contexts/LoginContextProvider'
import ProtectedRoute from './components/common/ProtectedRoute'
import OwnerLayout from './components/common/OwnerLayout'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Guestbook from './pages/Guestbook'
import Room from './pages/Room'
import User from './pages/User'
import Login from './pages/Login'
import Join from './pages/Join'
import NotFound from './pages/NotFound'
import RootRedirect from './components/common/RootRedirect'

function App() {

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          {/* 루트 — 로그인 시 내 홈으로, 비로그인 시 /join */}
          <Route path="/" element={<RootRedirect />} />

          {/* /:username — owner 검증 후 하위 라우트 렌더링 */}
          <Route path="/:username" element={<OwnerLayout />}>
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guestbook" element={<Guestbook />} />
            <Route path="room" element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <Room />
              </ProtectedRoute>
            } />
            <Route path="user" element={
              <ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}>
                <User />
              </ProtectedRoute>
            } />
            <Route path="login" element={
              <ProtectedRoute onlyGuest>
                <Login />
              </ProtectedRoute>
            } />
          </Route>

          {/* 계정 관련 */}
          <Route path="/join" element={
            <ProtectedRoute onlyGuest>
              <Join />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App
