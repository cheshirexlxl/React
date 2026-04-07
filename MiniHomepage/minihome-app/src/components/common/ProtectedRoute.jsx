import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roles: requiredRoles, onlyGuest }) => {

  const { isLoading, isLogin, hasAnyRole } = useAuth()

  // 자동 로그인 완료 전까지 대기
  if (isLoading) {
    return null
  }

  // 비로그인 전용 라우트: 로그인 상태면 홈으로
  if (onlyGuest) {
    return isLogin ? <Navigate to="/" replace /> : children
  }

  // 인증 확인
  if (!isLogin) {
    return <Navigate to="/login" replace />
  }
  // 권한 확인
  if( requiredRoles && !hasAnyRole(...requiredRoles) ) {
    return <Navigate to="/login" replace />
  }

  // 인증 OK, 권한 OK ➡ 자식 컴포넌트 렌더링
  return children
}

export default ProtectedRoute