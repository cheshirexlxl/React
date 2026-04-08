import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, useParams } from 'react-router-dom'

const ProtectedRoute = ({ children, roles: requiredRoles, onlyGuest }) => {

  const { isLoading, isLogin, hasAnyRole, userInfo } = useAuth()
  const { username } = useParams()

  // username: 현재 URL의 /:username 또는 로그인한 유저의 username
  const owner = username || userInfo?.username || ''

  // 자동 로그인 완료 전까지 대기
  if (isLoading) {
    return null
  }

  // 비로그인 전용 라우트: 로그인 상태면 홈으로
  if (onlyGuest) {
    return isLogin ? <Navigate to={`/${owner}`} replace /> : children
  }

  // 인증 확인
  if (!isLogin) {
    return <Navigate to={`/${owner}/login`} replace />
  }
  // 권한 확인
  if( requiredRoles && !hasAnyRole(...requiredRoles) ) {
    return <Navigate to={`/${owner}/login`} replace />
  }

  // 인증 OK, 권한 OK ➡ 자식 컴포넌트 렌더링
  return children
}

export default ProtectedRoute