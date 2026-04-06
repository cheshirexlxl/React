import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roles: requiredRoles }) => {

  const { isLoading, isLogin, hasAnyRole } = useAuth()

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